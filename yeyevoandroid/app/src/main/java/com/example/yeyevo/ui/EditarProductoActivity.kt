package com.example.yeyevo.ui

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.example.yeyevo.R
import com.example.yeyevo.data.api.apiService
import com.example.yeyevo.data.api.retrofitClient
import com.example.yeyevo.data.model.product
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response
import retrofit2.Retrofit

class EditarProductoActivity : AppCompatActivity() {

    private lateinit var editNombre: EditText
    private lateinit var editPrecio: EditText
    private lateinit var editImagen: EditText
    private lateinit var botonActualizar: Button

    private lateinit var producto: product
    private lateinit var apiService: apiService

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_editar_producto)

        editNombre = findViewById(R.id.editNombre)
        editPrecio = findViewById(R.id.editPrecio)
        editImagen = findViewById(R.id.editImagen)
        botonActualizar = findViewById(R.id.botonActualizar)

        producto = intent.getSerializableExtra("producto") as product

        editNombre.setText(producto.nombre)
        editPrecio.setText(producto.precio.toString())
        editImagen.setText(producto.imagen)


        // Inicializar Retrofit
        apiService = retrofitClient.instance

        // Obtener producto del intent
        producto = intent.getSerializableExtra("producto") as product

        // Aquí continúas con setear los datos en los campos, etc.

        botonActualizar.setOnClickListener {
            val nombreActualizado = editNombre.text.toString()
            val precioActualizado = editPrecio.text.toString().toDoubleOrNull()
            val imagenActualizada = editImagen.text.toString()


            if (nombreActualizado.isBlank() || precioActualizado == null) {
                Toast.makeText(this, "Campos inválidos", Toast.LENGTH_SHORT).show()
                return@setOnClickListener
            }

            val productoActualizado = product(
                id = producto.id,
                nombre = nombreActualizado,
                descripcion = producto.descripcion,
                precio = precioActualizado,
                stock = producto.stock,
                imagen = imagenActualizada,
                categoria_id = producto.categoria_id
            )

            apiService.actualizarProducto(producto.id, productoActualizado).enqueue(object : Callback<product> {
                override fun onResponse(call: Call<product>, response: Response<product>) {
                    if (response.isSuccessful) {
                        Toast.makeText(this@EditarProductoActivity, "Producto actualizado", Toast.LENGTH_SHORT).show()
                        finish()
                    } else {
                        Toast.makeText(this@EditarProductoActivity, "Error en respuesta", Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onFailure(call: Call<product>, t: Throwable) {
                    Toast.makeText(this@EditarProductoActivity, "Error de conexión", Toast.LENGTH_SHORT).show()
                }
            })
        }
    }
}