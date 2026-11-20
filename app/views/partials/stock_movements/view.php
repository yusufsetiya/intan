<?php 
//check if current user role is allowed access to the pages
$can_add = ACL::is_allowed("stock_movements/add");
$can_edit = ACL::is_allowed("stock_movements/edit");
$can_view = ACL::is_allowed("stock_movements/view");
$can_delete = ACL::is_allowed("stock_movements/delete");
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
                    <h4 class="record-title">View  Stock Movements</h4>
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
                        $rec_id = (!empty($data['id_movement']) ? urlencode($data['id_movement']) : null);
                        $counter++;
                        ?>
                        <div id="page-report-body" class="">
                            <table class="table table-hover table-borderless table-striped">
                                <!-- Table Body Start -->
                                <tbody class="page-data" id="page-data-<?php echo $page_element_id; ?>">
                                    <tr  class="td-id_movement">
                                        <th class="title"> Id Movement: </th>
                                        <td class="value"> <?php echo $data['id_movement']; ?></td>
                                    </tr>
                                    <tr  class="td-id_product">
                                        <th class="title"> Id Product: </th>
                                        <td class="value">
                                            <span <?php if($can_edit){ ?> data-value="<?php echo $data['id_product']; ?>" 
                                                data-pk="<?php echo $data['id_movement'] ?>" 
                                                data-url="<?php print_link("stock_movements/editfield/" . urlencode($data['id_movement'])); ?>" 
                                                data-name="id_product" 
                                                data-title="Enter Id Product" 
                                                data-placement="left" 
                                                data-toggle="click" 
                                                data-type="number" 
                                                data-mode="popover" 
                                                data-showbuttons="left" 
                                                class="is-editable" <?php } ?>>
                                                <?php echo $data['id_product']; ?> 
                                            </span>
                                        </td>
                                    </tr>
                                    <tr  class="td-tipe">
                                        <th class="title"> Tipe: </th>
                                        <td class="value">
                                            <span <?php if($can_edit){ ?> data-value="<?php echo $data['tipe']; ?>" 
                                                data-pk="<?php echo $data['id_movement'] ?>" 
                                                data-url="<?php print_link("stock_movements/editfield/" . urlencode($data['id_movement'])); ?>" 
                                                data-name="tipe" 
                                                data-title="Enter Tipe" 
                                                data-placement="left" 
                                                data-toggle="click" 
                                                data-type="text" 
                                                data-mode="popover" 
                                                data-showbuttons="left" 
                                                class="is-editable" <?php } ?>>
                                                <?php echo $data['tipe']; ?> 
                                            </span>
                                        </td>
                                    </tr>
                                    <tr  class="td-sumber">
                                        <th class="title"> Sumber: </th>
                                        <td class="value">
                                            <span <?php if($can_edit){ ?> data-value="<?php echo $data['sumber']; ?>" 
                                                data-pk="<?php echo $data['id_movement'] ?>" 
                                                data-url="<?php print_link("stock_movements/editfield/" . urlencode($data['id_movement'])); ?>" 
                                                data-name="sumber" 
                                                data-title="Enter Sumber" 
                                                data-placement="left" 
                                                data-toggle="click" 
                                                data-type="text" 
                                                data-mode="popover" 
                                                data-showbuttons="left" 
                                                class="is-editable" <?php } ?>>
                                                <?php echo $data['sumber']; ?> 
                                            </span>
                                        </td>
                                    </tr>
                                    <tr  class="td-id_referensi">
                                        <th class="title"> Id Referensi: </th>
                                        <td class="value">
                                            <span <?php if($can_edit){ ?> data-value="<?php echo $data['id_referensi']; ?>" 
                                                data-pk="<?php echo $data['id_movement'] ?>" 
                                                data-url="<?php print_link("stock_movements/editfield/" . urlencode($data['id_movement'])); ?>" 
                                                data-name="id_referensi" 
                                                data-title="Enter Id Referensi" 
                                                data-placement="left" 
                                                data-toggle="click" 
                                                data-type="number" 
                                                data-mode="popover" 
                                                data-showbuttons="left" 
                                                class="is-editable" <?php } ?>>
                                                <?php echo $data['id_referensi']; ?> 
                                            </span>
                                        </td>
                                    </tr>
                                    <tr  class="td-jumlah">
                                        <th class="title"> Jumlah: </th>
                                        <td class="value">
                                            <span <?php if($can_edit){ ?> data-step="0.1" 
                                                data-value="<?php echo $data['jumlah']; ?>" 
                                                data-pk="<?php echo $data['id_movement'] ?>" 
                                                data-url="<?php print_link("stock_movements/editfield/" . urlencode($data['id_movement'])); ?>" 
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
                                    <tr  class="td-stok_sebelum">
                                        <th class="title"> Stok Sebelum: </th>
                                        <td class="value">
                                            <span <?php if($can_edit){ ?> data-step="0.1" 
                                                data-value="<?php echo $data['stok_sebelum']; ?>" 
                                                data-pk="<?php echo $data['id_movement'] ?>" 
                                                data-url="<?php print_link("stock_movements/editfield/" . urlencode($data['id_movement'])); ?>" 
                                                data-name="stok_sebelum" 
                                                data-title="Enter Stok Sebelum" 
                                                data-placement="left" 
                                                data-toggle="click" 
                                                data-type="number" 
                                                data-mode="popover" 
                                                data-showbuttons="left" 
                                                class="is-editable" <?php } ?>>
                                                <?php echo $data['stok_sebelum']; ?> 
                                            </span>
                                        </td>
                                    </tr>
                                    <tr  class="td-stok_sesudah">
                                        <th class="title"> Stok Sesudah: </th>
                                        <td class="value">
                                            <span <?php if($can_edit){ ?> data-step="0.1" 
                                                data-value="<?php echo $data['stok_sesudah']; ?>" 
                                                data-pk="<?php echo $data['id_movement'] ?>" 
                                                data-url="<?php print_link("stock_movements/editfield/" . urlencode($data['id_movement'])); ?>" 
                                                data-name="stok_sesudah" 
                                                data-title="Enter Stok Sesudah" 
                                                data-placement="left" 
                                                data-toggle="click" 
                                                data-type="number" 
                                                data-mode="popover" 
                                                data-showbuttons="left" 
                                                class="is-editable" <?php } ?>>
                                                <?php echo $data['stok_sesudah']; ?> 
                                            </span>
                                        </td>
                                    </tr>
                                    <tr  class="td-keterangan">
                                        <th class="title"> Keterangan: </th>
                                        <td class="value">
                                            <span <?php if($can_edit){ ?> data-pk="<?php echo $data['id_movement'] ?>" 
                                                data-url="<?php print_link("stock_movements/editfield/" . urlencode($data['id_movement'])); ?>" 
                                                data-name="keterangan" 
                                                data-title="Enter Keterangan" 
                                                data-placement="left" 
                                                data-toggle="click" 
                                                data-type="textarea" 
                                                data-mode="popover" 
                                                data-showbuttons="left" 
                                                class="is-editable" <?php } ?>>
                                                <?php echo $data['keterangan']; ?> 
                                            </span>
                                        </td>
                                    </tr>
                                    <tr  class="td-created_at">
                                        <th class="title"> Created At: </th>
                                        <td class="value"> <?php echo $data['created_at']; ?></td>
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
                                                <?php if($can_edit){ ?>
                                                <a class="btn btn-sm btn-info"  href="<?php print_link("stock_movements/edit/$rec_id"); ?>">
                                                    <i class="fa fa-edit"></i> Edit
                                                </a>
                                                <?php } ?>
                                                <?php if($can_delete){ ?>
                                                <a class="btn btn-sm btn-danger record-delete-btn mx-1"  href="<?php print_link("stock_movements/delete/$rec_id/?csrf_token=$csrf_token&redirect=$current_page"); ?>" data-prompt-msg="Are you sure you want to delete this record?" data-display-style="modal">
                                                    <i class="fa fa-times"></i> Delete
                                                </a>
                                                <?php } ?>
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
