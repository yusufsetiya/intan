<?php
/**
 * Menu Items
 * All Project Menu
 * @category  Menu List
 */

class Menu{
	
	
			public static $navbartopleft = array(
		array(
			'path' => 'home', 
			'label' => 'Dasboard', 
			'icon' => '<i class="fa fa-home "></i>'
		),
		
		array(
			'path' => 'products', 
			'label' => 'Data Barang', 
			'icon' => '<i class="fa fa-dropbox "></i>'
		),
		
		array(
			'path' => 'categories', 
			'label' => 'Kategori Barang', 
			'icon' => '<i class="fa fa-tags "></i>'
		),
		
		array(
			'path' => 'sales', 
			'label' => 'Penjualan', 
			'icon' => '<i class="fa fa-shopping-cart "></i>'
		),
		
		array(
			'path' => 'purchases', 
			'label' => 'Pembelian / Stok Masuk', 
			'icon' => '<i class="fa fa-cart-plus "></i>'
		),
		
		array(
			'path' => 'suppliers', 
			'label' => 'Supplier', 
			'icon' => '<i class="fa fa-truck "></i>'
		),
		
		array(
			'path' => 'expenses', 
			'label' => 'Pengeluaran', 
			'icon' => '<i class="fa fa-google-wallet "></i>'
		),
		
		array(
			'path' => 'users', 
			'label' => 'Pengguna', 
			'icon' => '<i class="fa fa-user-secret "></i>'
		)
	);
		
	
	
			public static $jenis_keluar = array(
		array(
			"value" => "penjualan ", 
			"label" => "Penjualan", 
		),
		array(
			"value" => "rusak", 
			"label" => "Rusak", 
		),
		array(
			"value" => "penggunaan_internal", 
			"label" => "Pemakaian_sendiri", 
		),);
		
			public static $role = array(
		array(
			"value" => "kasir", 
			"label" => "kasir", 
		),
		array(
			"value" => "admin", 
			"label" => "admin", 
		),);
		
}