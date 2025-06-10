package com.example.yeyevo.ui

import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.yeyevo.R
import com.example.yeyevo.data.adapter.ProductAdapter
import com.example.yeyevo.data.api.retrofitClient
import com.example.yeyevo.data.model.product
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext

class ListaProductosActivity : AppCompatActivity() {

    private lateinit var recyclerView: RecyclerView
    private lateinit var adapter: ProductAdapter
    private var productList = ArrayList<product>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_lista_productos)

        recyclerView = findViewById(R.id.recyclerProducts)
        adapter = ProductAdapter(productList)
        recyclerView.layoutManager = GridLayoutManager(this, 2)
        recyclerView.adapter = adapter

        obtenerProductos()
    }

    private fun obtenerProductos() {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val response = retrofitClient.instance.getProducts()
                withContext(Dispatchers.Main) {
                    if (response.isSuccessful && response.body() != null) {
                        productList.clear()
                        productList.addAll(response.body()!!)
                        adapter.notifyDataSetChanged()
                    } else {
                        Toast.makeText(this@ListaProductosActivity, "No se pudieron obtener los productos", Toast.LENGTH_SHORT).show()
                    }
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    Toast.makeText(this@ListaProductosActivity, "Error: ${e.message}", Toast.LENGTH_SHORT).show()
                    Log.e("ListaProductos", "Error: ${e.message}")
                }
            }
        }
    }
}