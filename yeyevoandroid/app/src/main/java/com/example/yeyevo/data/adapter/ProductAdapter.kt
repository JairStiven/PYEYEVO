package com.example.yeyevo.data.adapter

import android.app.AlertDialog
import android.content.Context
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.TextView
import android.widget.Toast
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.example.yeyevo.R
import com.example.yeyevo.data.model.product
import com.bumptech.glide.request.RequestOptions
import com.example.yeyevo.ui.EditarProductoActivity
import com.example.yeyevo.data.api.apiService
import com.example.yeyevo.data.api.retrofitClient
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import kotlinx.coroutines.withContext


class ProductAdapter(private val productList: List<product>) :
    RecyclerView.Adapter<ProductAdapter.ProductViewHolder>() {

    private fun showOptionsDialog(context: Context, product: product) {
        val builder = AlertDialog.Builder(context)
        builder.setTitle("¿Qué deseas hacer?")
        builder.setMessage("Producto: ${product.nombre}")

        builder.setPositiveButton("Editar") { dialog, _ ->
            val intent = Intent(context, EditarProductoActivity::class.java)
            intent.putExtra("producto", product)
            context.startActivity(intent)
            dialog.dismiss()
        }

        builder.setNegativeButton("Eliminar") { dialog, _ ->
            AlertDialog.Builder(context).apply {
                setTitle("Confirmar eliminación")
                setMessage("¿Estás seguro de que deseas eliminar ${product.nombre}?")
                setPositiveButton("Sí") { _, _ ->
                    eliminarProducto(product.id, context)
                }
                setNegativeButton("Cancelar", null)
                show()
            }
            dialog.dismiss()
        }

        builder.setNeutralButton("Cancelar") { dialog, _ ->
            dialog.dismiss()
        }

        val dialog = builder.create()
        dialog.show()
    }

    class ProductViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val imageProduct: ImageView = itemView.findViewById(R.id.imageProduct)
        val textName: TextView = itemView.findViewById(R.id.textName)
        val textPrice: TextView = itemView.findViewById(R.id.textPrice)
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): ProductViewHolder {
        val view = LayoutInflater.from(parent.context)
            .inflate(R.layout.item_product, parent, false)
        return ProductViewHolder(view)
    }

    override fun getItemCount(): Int = productList.size

    override fun onBindViewHolder(holder: ProductViewHolder, position: Int) {
        val product = productList[position]
        holder.textName.text = product.nombre
        holder.textPrice.text = "$${product.precio}"
        Glide.with(holder.itemView.context)
            .load(product.imagen)
            .placeholder(R.drawable.ic_productos) // agrega un ícono temporal
            .into(holder.imageProduct)

        holder.itemView.setOnClickListener {
            // Mostrar diálogo al tocar el producto
            showOptionsDialog(holder.itemView.context, product)
        }
    }
    private fun eliminarProducto(idProducto: Int, context: Context) {
        CoroutineScope(Dispatchers.IO).launch {
            try {
                val response = retrofitClient.instance.eliminarProducto(idProducto)
                withContext(Dispatchers.Main) {
                    if (response.isSuccessful) {
                        Toast.makeText(context, "Producto eliminado", Toast.LENGTH_SHORT).show()
                        // Puedes hacer que se recargue la pantalla o actualizar la lista.
                    } else {
                        Toast.makeText(context, "Error al eliminar", Toast.LENGTH_SHORT).show()
                    }
                }
            } catch (e: Exception) {
                withContext(Dispatchers.Main) {
                    Toast.makeText(context, "Excepción: ${e.message}", Toast.LENGTH_LONG).show()
                }
            }
        }
    }
}