package com.example.yeyevo.data.api

import com.example.yeyevo.data.model.loginRequest
import com.example.yeyevo.data.model.loginResponse
import com.example.yeyevo.data.model.product
import retrofit2.Call
import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST
import retrofit2.http.GET
import retrofit2.http.PUT
import retrofit2.http.Path
import retrofit2.http.DELETE

interface apiService {
    @POST("auth/login")
    suspend fun login(@Body request: loginRequest): Response<loginResponse>

    @GET("products")
    suspend fun getProducts(): Response<List<product>>

    @PUT("products/{id}")
    fun actualizarProducto(
        @Path("id") id: Int,
        @Body producto: product
    ): Call<product>

    @DELETE("products/{id}")
    suspend fun eliminarProducto(@Path("id") id: Int): Response<Unit>
}