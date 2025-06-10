package com.example.yeyevo.ui

import android.app.DownloadManager
import android.content.Context
import android.content.Intent
import android.net.Uri
import android.os.Bundle
import android.os.Environment
import android.view.View
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.cardview.widget.CardView
import com.example.yeyevo.R




class AdminHomeActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_admin_home)

        // Referencias a los CardView para reportes
        val cardProductos = findViewById<CardView>(R.id.card_reporte_productos)
        val cardUsuarios = findViewById<CardView>(R.id.card_reporte_usuarios)

        // Acciones al hacer clic
        cardProductos.setOnClickListener {
            descargarReporte(this, "productos", "reporte_productos")
        }

        cardUsuarios.setOnClickListener {
            descargarReporte(this, "usuarios", "reporte_usuarios")
        }
    }

    fun irAVerProductos(view: View) {
        val intent = Intent(this, ListaProductosActivity::class.java)
        startActivity(intent)
    }

    private fun descargarReporte(context: Context, endpoint: String, nombreArchivo: String) {
        val url = "http://10.5.0.2/reportes/$endpoint"
        val request = DownloadManager.Request(Uri.parse(url)).apply {
            setTitle("Descargando reporte")
            setDescription("Descargando $nombreArchivo.pdf")
            setNotificationVisibility(DownloadManager.Request.VISIBILITY_VISIBLE_NOTIFY_COMPLETED)
            setDestinationInExternalPublicDir(Environment.DIRECTORY_DOWNLOADS, "$nombreArchivo.pdf")
            setAllowedNetworkTypes(DownloadManager.Request.NETWORK_WIFI or DownloadManager.Request.NETWORK_MOBILE)
        }

        val downloadManager = context.getSystemService(Context.DOWNLOAD_SERVICE) as DownloadManager
        downloadManager.enqueue(request)

        Toast.makeText(context, "Descarga iniciada", Toast.LENGTH_SHORT).show()
    }
}