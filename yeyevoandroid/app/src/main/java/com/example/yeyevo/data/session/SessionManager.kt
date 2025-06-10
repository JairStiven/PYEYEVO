package com.example.yeyevo.data.session

import android.content.Context
import android.content.SharedPreferences

class SessionManager(context: Context) {

    private val prefs: SharedPreferences = context.getSharedPreferences("user_session", Context.MODE_PRIVATE)

    fun saveAuthToken(token: String) {
        prefs.edit().putString("AUTH_TOKEN", token).apply()
    }

    fun saveUserData(nombre: String, email: String, rol: String) {
        prefs.edit()
            .putString("USER_NAME", nombre)
            .putString("USER_EMAIL", email)
            .putString("USER_ROLE", rol)
            .apply()
    }

    fun fetchAuthToken(): String? {
        return prefs.getString("AUTH_TOKEN", null)
    }

    fun getUserRole(): String? {
        return prefs.getString("USER_ROLE", null)
    }

    fun clearSession() {
        prefs.edit().clear().apply()
    }
}