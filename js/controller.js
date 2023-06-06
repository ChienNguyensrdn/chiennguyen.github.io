var addCart = {
    init: function () {
        addCart.registerEvent();
    },
    registerEvent: function () {
        $('.add_cart').on('click', function (e) {
            e.preventDefault();
            var prid = $(this).data('prid');
            var uid = $(this).data('us');
            //$.ajax({
            //    url: "/MsUser/AddCart",
            //    data: {
            //        prid: prid,
            //        uid: uid,
            //    },
            //    dataType: "json",
            //    type: "POST",
            //    success: function (responsive) {
            //        console.log(responsive);
            //        if (!responsive) {
            //            alert("Thêm giỏ hàng lỗi")
            //        }
            //        else {
            //            debugger;
            //            console.log(responsive.MyCartList);
            //        }
            //    }
            //});
            $.post("/MsUser/AddCart", { prid: prid, uid: uid }, function (data) {
                if (data.errMess == null) {
                    $(".cart-product").html("");
                    var link = "/Product/CtProduct/";
                    var count = 0;
                    $.each(data, function (i, cartItem) {
                        count++;
                        $(".cart-product").append("<ul data-prID='" + cartItem.PrID + "'><li class=' cart_item cart-img'><a href='" + link + cartItem.PrID + "'><img src='" + cartItem.Img + "' alt='" + cartItem.PrName + "'></a></li><li class='cart_item cart-name'><a href='" + link + cartItem.PrID + "'>" + cartItem.PrName + "</a></li><li class='cart_item cart-price'><p>" + cartItem.Price + "</p></li><div class='clear'></div></ul>");
                        if (count == 5) {
                            return false;
                        }
                    });
                    $(".cart-product").append("<div class='see-all text-right'><a class='slider_btn' href='#'>See All</a></div>");
                    alert("Thêm thành công!!");
                }
                else {
                    //console.log(data);
                    alert(data.errMess);
                }

            }, 'json');

        });

    }
};

function MyFileUp() {
    'use strict';

    $('.list-music-item').on('change', 'input.file-upload-default', function () {
        if ($(this).val() == "") {
            $(this).parent().find('.remove-music').css('display', 'none');
        }
        else {
            $(this).parent().find('.remove-music').css('display', 'block');
        }

    });

}

$('.list-music-item').on('click', "button.remove-music", function () {
    $(this).parent().remove();
});
function fileUp() {
    $('.list-music-item').on('click', "button.file-upload-browse", function () {
        var file = $(this).parent().parent().parent().parent().find('.file-upload-default');
        file.trigger('click');
    });
    $('.list-music-item').on('change', "input.file-upload-default", function () {
        $(this).parent().find('.file-name').val($(this).val().replace(/C:\\fakepath\\/i, ''));
    });
}

function addMu() {

    $('.add-music').click(function () {
        $(this).parent().find('.list-music-item').append(
            `<div class="form-group">
					<label>Music</label>
					<input type="file" name="muFileDefualt" class = "file-upload-default" required = "required" accept = "audio/*"/>
                    <div class="row">
                        <div class="input-group col-md-6">
                            <input type="text" class="form-control mu_name" name="muname" id="muName" placeholder="Music Name" required="required">
                        </div>
                        <div class="input-group col-md-6">
                            <input type="text" class="form-control file-upload-info file-name" disabled placeholder="Upload Image">
                            <span class="input-group-append">
                                <button class="file-upload-browse btn btn-gradient-primary" type="button">Upload</button>
                            </span>
                        </div>
                      </div>
					<button class=" btn btn-danger remove-music" type="button">Remove</button>
              <div>`
        );
    });
}


//// Dooan ni truoc copy mo eo nho nua
//window.addEventListener("submit", function (e) {
//    alert('in f');
//    if (document.getElementById('xxx').files.length == 0)
//        return;
//    var form = e.target;
//    alert('in ffff');
//    if (form.gete("enctype") === "multipart/form-data") {
//        if (form.dataset.ajax) {
//            e.preventtAttribuDefault();
//            e.stopImmediatePropagation();
//            var xhr = new XMLHttpRequest();
//            xhr.open(form.method, form.action);
//            xhr.onreadystatechange = function () {
//                if (xhr.readyState == 4 && xhr.status == 200) {
//                    if (form.dataset.ajaxUpdate) {
//                        var updateTarget = document.querySelector(form.dataset.ajaxUpdate);
//                        if (updateTarget) {
//                            updateTarget.innerHTML = xhr.responseText;

//                            //if (xhr.responseText.indexOf("notifySuccess", 0) != -1)
//                            //    notifySuccess('Đã cập nhật thành công!');
//                            //else
//                            //    notifyError('Đã có lỗi! Bạn vui lòng kiểm tra lại thông tin đã nhập!');
//                            //$('html,body').animate({ scrollTop: 70 }, 1000, 'swing');
//                            alert('ok')
//                        }
//                    }
//                }
//                else {
//                    alert('loi');
//                }
//            };
//            xhr.send(new FormData(form));

//        }
//    }
//}, true);


//var sendFile = {
//    init: function () {
//        sendFile.buyEvent();
//    },
//    buyEvent: function () {
//        $('.save-product').click(function (e) {
//            var fileList = new Array();
//            $('.multi-file').each(function () {
//                fileList.push($(this).val()); // file thi no co nhieu du lieu chu k don gian la ten 
//            });
//            console.log(fileList);
//            //$.ajax({
//            //    url: "/Profile/AddProduct",
//            //    data: {
//            //        myFileList: fileList
//            //    },
//            //    dataType: "json",
//            //    type: "POST",
//            //    success: function (responsive) {
//            //        console.log(responsive);
//            //    }
//            //});
//            $.post("/Profile/AddProduct", { myFileList: fileList });
//        });
//    }
//}
//sendFile.init();
MyFileUp();
addMu();
fileUp();
addCart.init();