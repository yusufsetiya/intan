<?php 
//check if current user role is allowed access to the pages
$can_add = ACL::is_allowed("sales/add");
$can_edit = ACL::is_allowed("sales/edit");
$can_view = ACL::is_allowed("sales/view");
$can_delete = ACL::is_allowed("sales/delete");
?>
<?php
$comp_model = new SharedController;
$page_element_id = "view-page-" . random_str();
$current_page = $this->set_current_page_link();
$csrf_token = Csrf::$token;
//Page Data Information from Controller
$data = $this->view_data;
//$rec_id = $data['__tableprimarykey'];
$page_id = $this->route->page_id; //Page id from url
$view_title = $this->view_title;
$show_header = $this->show_header;
$show_edit_btn = $this->show_edit_btn;
$show_delete_btn = $this->show_delete_btn;
$show_export_btn = $this->show_export_btn;
?>
<section class="page" id="<?php echo $page_element_id; ?>" data-page-type="view"  data-display-type="table" data-page-url="<?php print_link($current_page); ?>">
    <?php
    if( $show_header == true ){
    ?>
    <div  class="bg-light p-3 mb-3">
        <div class="container">
            <div class="row ">
                <div class="col ">
                    <h4 class="record-title">View  Sales</h4>
                </div>
            </div>
        </div>
    </div>
    <?php
    }
    ?>
    <div  class="">
        <div class="container">
            <div class="row ">
                <div class="col-md-12 comp-grid">
                    <?php $this :: display_page_errors(); ?>
                    <div  class="card animated fadeIn page-content">
                        <?php
                        $counter = 0;
                        if(!empty($data)){
                        $rec_id = (!empty($data['id_sale']) ? urlencode($data['id_sale']) : null);
                        $counter++;
                        ?>
                        <div id="page-report-body" class="">
                            <table class="table table-hover table-borderless table-striped">
                                <!-- Table Body Start -->
                                <tbody class="page-data" id="page-data-<?php echo $page_element_id; ?>">
                                    <tr  class="td-no_transaksi">
                                        <th class="title"> No Transaksi: </th>
                                        <td class="value">
                                            <span <?php if($can_edit){ ?> data-value="<?php echo $data['no_transaksi']; ?>" 
                                                data-pk="<?php echo $data['id_sale'] ?>" 
                                                data-url="<?php print_link("sales/editfield/" . urlencode($data['id_sale'])); ?>" 
                                                data-name="no_transaksi" 
                                                data-title="Enter No Transaksi" 
                                                data-placement="left" 
                                                data-toggle="click" 
                                                data-type="text" 
                                                data-mode="popover" 
                                                data-showbuttons="left" 
                                                class="is-editable" <?php } ?>>
                                                <?php echo $data['no_transaksi']; ?> 
                                            </span>
                                        </td>
                                    </tr>
                                    <tr  class="td-id_user">
                                        <th class="title"> Id User: </th>
                                        <td class="value">
                                            <a size="sm" class="btn btn-sm btn-primary page-modal" href="<?php print_link("users/view/" . urlencode($data['id_user'])) ?>">
                                                <i class="fa fa-eye"></i> <?php echo $data['users_nama'] ?>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr  class="td-tanggal">
                                        <th class="title"> Tanggal: </th>
                                        <td class="value"> <?php echo $data['tanggal']; ?></td>
                                    </tr>
                                    <tr  class="td-id_product">
                                        <th class="title">  Product: </th>
                                        <td class="value">
                                            <a size="sm" class="btn btn-sm btn-primary page-modal" href="<?php print_link("products/view/" . urlencode($data['id_product'])) ?>">
                                                <i class="fa fa-eye"></i> <?php echo $data['products_nama_barang'] ?>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr  class="td-jenis_keluar">
                                        <th class="title"> Jenis Keluar: </th>
                                        <td class="value">
                                            <span <?php if($can_edit){ ?> data-source='<?php echo json_encode_quote(Menu :: $jenis_keluar); ?>' 
                                                data-value="<?php echo $data['jenis_keluar']; ?>" 
                                                data-pk="<?php echo $data['id_sale'] ?>" 
                                                data-url="<?php print_link("sales/editfield/" . urlencode($data['id_sale'])); ?>" 
                                                data-name="jenis_keluar" 
                                                data-title="Select a value ..." 
                                                data-placement="left" 
                                                data-toggle="click" 
                                                data-type="select" 
                                                data-mode="popover" 
                                                data-showbuttons="left" 
                                                class="is-editable" <?php } ?>>
                                                <?php echo $data['jenis_keluar']; ?> 
                                            </span>
                                        </td>
                                    </tr>
                                    <tr  class="td-jumlah">
                                        <th class="title"> Jumlah: </th>
                                        <td class="value">
                                            <span <?php if($can_edit){ ?> data-step="0.1" 
                                                data-value="<?php echo $data['jumlah']; ?>" 
                                                data-pk="<?php echo $data['id_sale'] ?>" 
                                                data-url="<?php print_link("sales/editfield/" . urlencode($data['id_sale'])); ?>" 
                                                data-name="jumlah" 
                                                data-title="Enter Jumlah" 
                                                data-placement="left" 
                                                data-toggle="click" 
                                                data-type="number" 
                                                data-mode="popover" 
                                                data-showbuttons="left" 
                                                class="is-editable" <?php } ?>>
                                                <?php echo $data['jumlah']; ?> 
                                            </span>
                                        </td>
                                    </tr>
                                    <tr  class="td-harga_jual">
                                        <th class="title"> Harga Jual: </th>
                                        <td class="value">
                                            <span <?php if($can_edit){ ?> data-step="0.1" 
                                                data-value="<?php echo $data['harga_jual']; ?>" 
                                                data-pk="<?php echo $data['id_sale'] ?>" 
                                                data-url="<?php print_link("sales/editfield/" . urlencode($data['id_sale'])); ?>" 
                                                data-name="harga_jual" 
                                                data-title="Enter Harga Jual" 
                                                data-placement="left" 
                                                data-toggle="click" 
                                                data-type="number" 
                                                data-mode="popover" 
                                                data-showbuttons="left" 
                                                class="is-editable" <?php } ?>>
                                                <?php echo $data['harga_jual']; ?> 
                                            </span>
                                        </td>
                                    </tr>
                                    <tr  class="td-harga_pokok">
                                        <th class="title"> Harga Pokok: </th>
                                        <td class="value"> <?php echo $data['harga_pokok']; ?></td>
                                    </tr>
                                    <tr  class="td-total">
                                        <th class="title"> Total: </th>
                                        <td class="value"> <?php echo $data['total']; ?></td>
                                    </tr>
                                    <tr  class="td-catatan">
                                        <th class="title"> Catatan: </th>
                                        <td class="value">
                                            <span <?php if($can_edit){ ?> data-pk="<?php echo $data['id_sale'] ?>" 
                                                data-url="<?php print_link("sales/editfield/" . urlencode($data['id_sale'])); ?>" 
                                                data-name="catatan" 
                                                data-title="Enter Catatan" 
                                                data-placement="left" 
                                                data-toggle="click" 
                                                data-type="textarea" 
                                                data-mode="popover" 
                                                data-showbuttons="left" 
                                                class="is-editable" <?php } ?>>
                                                <?php echo $data['catatan']; ?> 
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                                <!-- Table Body End -->
                            </table>
                        </div>
                        <div class="p-3 d-flex">
                            <div class="dropup export-btn-holder mx-1">
                                <button class="btn btn-sm btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i class="fa fa-save"></i> Export
                                </button>
                                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                    <?php $export_print_link = $this->set_current_page_link(array('format' => 'print')); ?>
                                    <a class="dropdown-item export-link-btn" data-format="print" href="<?php print_link($export_print_link); ?>" target="_blank">
                                        <img src="<?php print_link('assets/images/print.png') ?>" class="mr-2" /> PRINT
                                        </a>
                                        <?php $export_pdf_link = $this->set_current_page_link(array('format' => 'pdf')); ?>
                                        <a class="dropdown-item export-link-btn" data-format="pdf" href="<?php print_link($export_pdf_link); ?>" target="_blank">
                                            <img src="<?php print_link('assets/images/pdf.png') ?>" class="mr-2" /> PDF
                                            </a>
                                            <?php $export_word_link = $this->set_current_page_link(array('format' => 'word')); ?>
                                            <a class="dropdown-item export-link-btn" data-format="word" href="<?php print_link($export_word_link); ?>" target="_blank">
                                                <img src="<?php print_link('assets/images/doc.png') ?>" class="mr-2" /> WORD
                                                </a>
                                                <?php $export_csv_link = $this->set_current_page_link(array('format' => 'csv')); ?>
                                                <a class="dropdown-item export-link-btn" data-format="csv" href="<?php print_link($export_csv_link); ?>" target="_blank">
                                                    <img src="<?php print_link('assets/images/csv.png') ?>" class="mr-2" /> CSV
                                                    </a>
                                                    <?php $export_excel_link = $this->set_current_page_link(array('format' => 'excel')); ?>
                                                    <a class="dropdown-item export-link-btn" data-format="excel" href="<?php print_link($export_excel_link); ?>" target="_blank">
                                                        <img src="<?php print_link('assets/images/xsl.png') ?>" class="mr-2" /> EXCEL
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                            <?php
                                            }
                                            else{
                                            ?>
                                            <!-- Empty Record Message -->
                                            <div class="text-muted p-3">
                                                <i class="fa fa-ban"></i> No Record Found
                                            </div>
                                            <?php
                                            }
                                            ?>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
