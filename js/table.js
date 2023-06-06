//
// This is The Scripts used for Simply Theme
// 
function initTable() {

    (function () {
        jQuery(document).ready(function ($) {
            $(".table-checkbox").change(function() {
                var tr = $(this).closest('tr');
                $(tr).toggleClass('active');
            });
            $(".h-table thead .table-checkAll").change(function(){
                if(this.checked) {
                    $(".h-table tbody tr").each(function(){
                        if(!$(this).hasClass('active')){
                            $(this).addClass('active');
                        }
                        $(this).find('.table-checkbox').prop('checked', true);
                    });
                }
                else{
                    $(".h-table tbody tr").each(function(){
                        $(this).removeClass('active');
                        $(this).find('.table-checkbox').prop('checked', false);
                    });
                }
            });
            // Edit
            $(document).on('click',".row-edit",function(){
                var u = $(this).parent();
                $(this).addClass('hidden');
                u.find('.row-save').removeClass('hidden');
                u.find('.row-delete').addClass('hidden');

                var t = $(this).closest('tr');
                t.find('td').each(function(){
                    $(this).find('.col-val').addClass('hidden');
                    $(this).find('.item-control').removeClass('hidden');
                });
            });

            // Save
            $(document).on('click',".row-save",function(){
                var u = $(this).parent();
                $(this).addClass('hidden');
                u.find('.row-edit,.row-delete').removeClass('hidden');
                var t = $(this).closest('tr');
                t.find('td').each(function(){
                    $(this).find('.col-val').text($(this).find('.item-control').val());
                    $(this).find('.col-val').removeClass('hidden');
                    $(this).find('.item-control').addClass('hidden');
                });
            });

            // Delete
            $(document).on('click',".row-delete",function(){
                $(this).closest('tr').remove();
            });

            // Add
            $(".table-add-btn").on('click',function(){
                var tb = $(this).parent().find('.h-table');
                var tbody = tb.find('tbody');
                var newTr = `<tr>
                                                        <td class="text-center check-col"><input type="checkbox" class="table-checkbox"></td>
                                                        <td>
                                                            <span class="col-val hidden"></span>
                                                            <input type="text" class="table-control item-control comName" value="">
                                                        </td>
                                                        <td>
                                                            <span class="col-val hidden"></span>
                                                            <input type="text" class="table-control item-control fromMonth" placeholder="mm/yyyy" value="">
                                                        </td>
                                                        <td>
                                                            <span class="col-val hidden"></span>
                                                            <input type="text" class="table-control item-control toMonth" placeholder="mm/yyyy" value="">
                                                        </td>
                                                        <td>
                                                            <span class="col-val hidden"></span>
                                                            <input type="text" class="table-control item-control position" value="">
                                                        </td>
                                                        <td>
                                                            <span class="col-val hidden"></span>
                                                            <input type="text" class="table-control item-control jobDes" value="">
                                                        </td>
                                                        <td>
                                                            <span class="col-val hidden"></span>
                                                            <input type="text" class="table-control item-control leaveReason" value="">
                                                        </td>
                                                        <td>
                                                            <span class="col-val hidden"></span>
                                                            <input type="text" class="table-control item-control note" value="">
                                                        </td>
                                                        <td>
                                                            <ul class="table-action">
                                                                <li class="table-action-control row-save"><i class="fa fa-check" aria-hidden="true"></i></li>
                                                                <li class="table-action-control row-edit hidden"><i class="fa fa-pencil" aria-hidden="true"></i></li>
                                                                <li class="table-action-control row-delete hidden"><i class="fa fa-trash-o" aria-hidden="true"></i></li>
                                                            </ul>
                                                        </td>
                                                    </tr>`;
                if(tbody.length ==0){
                    newTr = '<tbody>' + newTr + '</tbody>';
                    tb.append(newTr);
                }
                else{
                    tbody.append(newTr);
                }
            });
        });

        jQuery(window).scroll(function () {

        });

        jQuery(window).load(function () {



        });

    }());

}
initTable();