<?php 

/**
 * SharedController Controller
 * @category  Controller / Model
 */
class SharedController extends BaseController{
	
	/**
     * expenses_id_user_option_list Model Action
     * @return array
     */
	function expenses_id_user_option_list(){
		$db = $this->GetModel();
		$sqltext = "SELECT DISTINCT id_user AS value , username AS label FROM users ORDER BY label ASC";
		$queryparams = null;
		$arr = $db->rawQuery($sqltext, $queryparams);
		return $arr;
	}

	/**
     * expenses_kategori_option_list Model Action
     * @return array
     */
	function expenses_kategori_option_list(){
		$db = $this->GetModel();
		$sqltext = "SELECT DISTINCT id_category AS value , id_category AS label FROM categories ORDER BY label ASC";
		$queryparams = null;
		$arr = $db->rawQuery($sqltext, $queryparams);
		return $arr;
	}

	/**
     * products_id_category_option_list Model Action
     * @return array
     */
	function products_id_category_option_list(){
		$db = $this->GetModel();
		$sqltext = "SELECT DISTINCT id_category AS value , id_category AS label FROM categories ORDER BY label ASC";
		$queryparams = null;
		$arr = $db->rawQuery($sqltext, $queryparams);
		return $arr;
	}

	/**
     * purchases_id_supplier_option_list Model Action
     * @return array
     */
	function purchases_id_supplier_option_list(){
		$db = $this->GetModel();
		$sqltext = "SELECT DISTINCT id_supplier AS value , id_supplier AS label FROM suppliers ORDER BY label ASC";
		$queryparams = null;
		$arr = $db->rawQuery($sqltext, $queryparams);
		return $arr;
	}

	/**
     * purchases_id_user_option_list Model Action
     * @return array
     */
	function purchases_id_user_option_list(){
		$db = $this->GetModel();
		$sqltext = "SELECT DISTINCT id_user AS value , username AS label FROM users ORDER BY label ASC";
		$queryparams = null;
		$arr = $db->rawQuery($sqltext, $queryparams);
		return $arr;
	}

	/**
     * sales_id_user_option_list Model Action
     * @return array
     */
	function sales_id_user_option_list(){
		$db = $this->GetModel();
		$sqltext = "SELECT  DISTINCT id_user AS value,nama AS label FROM users";
		$queryparams = null;
		$arr = $db->rawQuery($sqltext, $queryparams);
		return $arr;
	}

	/**
     * sales_id_product_option_list Model Action
     * @return array
     */
	function sales_id_product_option_list(){
		$db = $this->GetModel();
		$sqltext = "SELECT DISTINCT id_product AS value , id_product AS label FROM products ORDER BY label ASC";
		$queryparams = null;
		$arr = $db->rawQuery($sqltext, $queryparams);
		return $arr;
	}

	/**
     * users_username_value_exist Model Action
     * @return array
     */
	function users_username_value_exist($val){
		$db = $this->GetModel();
		$db->where("username", $val);
		$exist = $db->has("users");
		return $exist;
	}

	/**
     * users_email_value_exist Model Action
     * @return array
     */
	function users_email_value_exist($val){
		$db = $this->GetModel();
		$db->where("email", $val);
		$exist = $db->has("users");
		return $exist;
	}

}
