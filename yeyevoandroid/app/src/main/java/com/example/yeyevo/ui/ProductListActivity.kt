package com.example.yeyevo.ui


import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.GridLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.example.yeyevo.R
import com.example.yeyevo.data.adapter.ProductAdapter
import com.example.yeyevo.data.api.retrofitClient
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext


class ProductListActivity : AppCompatActivity() {

    private lateinit var recyclerView: RecyclerView
    private lateinit var adapter: ProductAdapter

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_lista_productos)

        recyclerView = findViewById(R.id.recyclerProducts)
        recyclerView.layoutManager = GridLayoutManager(this, 2)

        fetchProducts()
    }

    private fun fetchProducts() {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val response = retrofitClient.instance.getProducts()
                if (response.isSuccessful && response.body() != null) {
                    val productList = response.body()!!
                    withContext(Dispatchers.Main) {
                        adapter = ProductAdapter(productList)
                        recyclerView.adapter = adapter
                    }
                } else {
                    withContext(Dispatchers.Main) {
                        Toast.makeText(this@ProductListActivity, "No se pudieron obtener los productos", Toast.LENGTH_SHORT).show()
                    }
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    Toast.makeText(this@ProductListActivity, "Error: ${e.message}", Toast.LENGTH_SHORT).show()
                }
            }
        }
    }


}