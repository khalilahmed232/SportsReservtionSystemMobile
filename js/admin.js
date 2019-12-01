function showAlert(btn) {
    btn.siblings(".alert").show();
    btn.siblings(".alert").find(".span-text").html(btn.siblings("input").val());
}
