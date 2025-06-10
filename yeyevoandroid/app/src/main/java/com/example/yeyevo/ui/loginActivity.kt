package com.example.yeyevo.ui

import android.content.Intent
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.yeyevo.R
import com.example.yeyevo.data.api.retrofitClient
import com.example.yeyevo.data.model.loginRequest
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext
import com.example.yeyevo.data.session.SessionManager

class loginActivity : AppCompatActivity() {

    private lateinit var editTextEmail: EditText
    private lateinit var editTextPassword: EditText
    private lateinit var btnLogin: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        editTextEmail = findViewById(R.id.editTextEmail)
        editTextPassword = findViewById(R.id.editTextPassword)
        btnLogin = findViewById(R.id.btnLogin)

        btnLogin.setOnClickListener {
            val email = editTextEmail.text.toString().trim()
            val password = editTextPassword.text.toString().trim()

            if (email.isNotEmpty() && password.isNotEmpty()) {
                loginUser(email, password)
            } else {
                Toast.makeText(this, "Rellena todos los campos", Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun loginUser(email: String, password: String) {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val response = retrofitClient.instance.login(loginRequest(email, password))
                withContext(Dispatchers.Main) {
                    if (response.isSuccessful && response.body() != null) {
                        val user = response.body()!!.user
                        val token = response.body()!!.token
                        val sessionManager = SessionManager(this@loginActivity)
                        sessionManager.saveAuthToken(token)
                        sessionManager.saveUserData(user.nombre, user.email, user.rol)
                        Toast.makeText(this@loginActivity, "Bienvenido ${user.nombre}", Toast.LENGTH_LONG).show()

                        when (user.rol) {
                            "admin" -> {
                                val intent = Intent(this@loginActivity, AdminHomeActivity::class.java)
                                startActivity(intent)
                                finish()
                            }
                            "cliente" -> {
                                val intent = Intent(this@loginActivity, ClientHomeActivity::class.java)
                                startActivity(intent)
                                finish()
                            }
                            else -> {
                                Toast.makeText(this@loginActivity, "Rol no autorizado", Toast.LENGTH_SHORT).show()
                            }
                        }


                        // Aquí podrías guardar el token o pasar a otra Activity
                    } else {
                        Toast.makeText(this@loginActivity, "Credenciales incorrectas", Toast.LENGTH_SHORT).show()
                    }
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    Toast.makeText(this@loginActivity, "Error de conexión: ${e.message}", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }
}