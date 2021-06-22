class DateTime {
    
  static changeFormatDate(dated) {
    let date = new Date(dated);
    let dateValue = null;

    if (date) {
      let dd = String(date.getDate()).padStart(2, '0');
      let mm = String(date.getMonth() + 1).padStart(2, '0');
      let yyyy = date.getFullYear();
      dateValue =  mm + '/' + dd + '/' + yyyy;
    }

    return dateValue;
  }

  static changeFormatDateMaterialUI(dateUI) {
    let date = dateUI ? new Date(dateUI) : new Date();
    let dateValue = null;

    if (date) {
      let dd = String(date.getDate()).padStart(2, '0');
      let mm = String(date.getMonth() + 1).padStart(2, '0');
      let yyyy = date.getFullYear();
      dateValue =  yyyy + '-' + mm + '-' + dd;
    }

    return dateValue;
  }
}

export default DateTime;