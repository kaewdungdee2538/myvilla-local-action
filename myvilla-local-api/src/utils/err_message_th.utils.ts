export class ErrMessageUtilsTH {
  messageSuccess = 'เรียบร้อย';
  messageSuccessEn = 'Success';
  messageProcessFail = 'ล้มเหลว';
  errBasicAuthFailed= 'Authen Failed'
  errConnectServerCalculateError = 'เชื่อมต่อ API คำนวณค่าจอดล้มเหลว';
  errConnectServerLineNotificationError =
    'เชื่อมต่อ API Line notification ล้มเหลว';
  errLoginUserOrPasswordNotValid = 'Username หรือ Password ไม่ถูกต้อง';
  errLoginFail = 'เข้าสู่ระบบล้มเหลว';

  errRecordInNotFound = 'ไม่พบข้อมูลการทำรายการเข้า';

  errCompanyIDNotFound = 'ไม่พบรหัสโครงการ';
  errCompanyIDNotNumber = 'รหัสโครงการต้องเป็นตัวเลยเท่านั้น';
  errCompanyNotInBase = 'ไม่พบโครงการในระบบ';
  errCompanyStartDateNotFound = 'ไม่พบวันเปิดให้บริการของโครงการนี้';
  errCompanyExpireDateNotFound = 'ไม่พบวันหมดอายุการให้บริการของโครงการนี้';
  errCompanyNotStart = 'โครงการนี้ยังไม่เปิดให้บริการ';
  errCompanyIsExpire = 'โครงการนี้ หมดสัญญาการให้บริการ';

  errCompanyIDProhibitSpecial = 'รหัสโครงการห้ามมีอักขระพิเศษ';
  errCompanyCodeProhibitSpecial = 'โค้ดโครงการห้ามีอักขระพิเศษ';
  errGuardHouseIDNotFound = 'ไม่พบรหัสป้อม';
  errGuardHouseIDNotNumber = 'รหัสป้อมต้องเป็นตัวเลขเท่านั้น';
  errGuardHouseIDProhibitSpecial = 'รหัสป้อมห้ามมีอักชระพิเศษ';
  errGuardHouseCodeProhibitSpecial = 'โค้ดป้อมห้ามมีอักขระพิเศษ';

  errVisitorSlotRunningIdNotFound = 'ไม่พบ visitor_slot_running_id';
  errVisitorSlotRunningIdNotNumber =
    'visitor_slot_running_id ต้องเป็นตัวเลขเท่านั้น';
  errVisitorCartypeIDNotfound = 'ไม่พบรหัสประเภทรถ';
  errVisitorCartypeIDProhibitSpecail = 'รหัสประเภทรถห้ามมีอักขระพิเศษ';
  errVisitorCartypeIDNotNumber = 'รหัสประเภทรถต้องเป็นตัวเลขเท่านั้น';
  errVisitorCartypeNameContractionNotFound = 'ไม่พบอักษรย่อของประเภทรถ';
  errVisitorCartypeNameContractionProhibitSpecial =
    'อักษรย่อของประเภทรถ ห้ามมีอักขระพิเศษหรือช่องว่าง';
  errVisitorCartypeNameThNotFound = 'ไม่พบประเภทรถ (ชื่อไทย)';
  errVisitorCartypeNameThProhibitSpecial =
    'ประเภทรถ (ชื่อไทย) ห้ามมีอักขระพิเศษหรือช่องว่าง';
  errVisitorCartypeNameEnNotFound = 'ไม่พบประเภทรถ (ชื่ออังกฤษ)';
  errVisitorCartypeNameEnProhibitSpecial =
    'ปรเภทรถ (ชื่ออังกฤษ) ห้ามมีอักขระพิเศษหรือช่องว่าง';

  errVisitorRecordIdNotFound = 'ไม่พบรหัส Visitor record';
  errVisitorRecordIdProhibitSpecial =
    'Visitor record ห้ามมีอักระพิเศษ หรือช่องว่าง';
  errVisitorRecordIdNotNumber = 'Visitor record ต้องเป็นตัวเลขเท่านั้น';

  errVisitorNotIn = 'ไม่พบข้อมูลทำรายการเข้า';
  errVisitorInfoNotFound = 'ไม่พบข้อมูลของ Visitor';
  errVisitorInfoPrefixNameNotFound = 'ไม่พบคำนำหน้าชื่อ Visitor';
  errVisitorInfoPrefixNameProhibitSpecial =
    'คำนำหน้าชื่อ Visitor ห้ามมีอักขระพิเศษหรือช่องว่าง';
  errVisitorInfoFirstNameNotFound = 'ไม่พบชื่อของ Visitor';
  errVisitorInfoFirstNameProhibitSpecial =
    'ชื่อของ Visitor ห้ามมีอักขระพิเศษหรือช่องว่าง';
  errVisitorInfoLastNameNotFound = 'ไม่พบนามสกุลของ Visitor';
  errVisitorInfoLastNameProhibitSpecial =
    'นามสกุลของ Visiotr ห้ามมีอักขระพิเศษหรือช่องว่าง';
  errVisitorInfoBirthDateNotFound = 'ไม่พบวัน-เดือน-ปี เกิด ของ Visitor';
  errVisitorInfoIdentityNotFound = 'ไม่พบรหัสประจำตัวประชาชน';
  errVisitorInfoIdentityProhitbitSpecial =
    'รหัสประจำตัวประชาชนห้ามมีอักขระพิเศษ';
  errVisitorInfoIdentityNotNumber = 'รหัสประจำตัวประชาชนต้องเป็นตัวเลขเท่านั้น';
  errVisitorInfoIdentityFormatNotValid = 'รูปแบบรหัสประชำตัวประชาชนไม่ถูกต้อง';

  errEmployeeIDNotFound = 'ไม่พบไอดีพนักงาน';
  errEmployeeIDNotNumber = 'ไอดีพนักงานต้องเป็นตัวเลขเท่านั้น';
  errEmployeeIDProhibitSpecail = 'ไอดีพนักงานห้ามมีอักขระพิเศษ';
  errEmployeeIDNotInDatabase = 'ไม่พบพนักงานในระบบ';
  errEmployeeCodeNotFound = 'ไม่พบรหัสพนักงาน';
  errEmployeeFirstNameNotFound = 'ไม่พบชื่อพนักงาน';
  errEmployeeFitstNameProhibitSpecial =
    'ชื่อพนักงาน ห้ามมีอักขระพิเศษหรือช่องว่าง';
  errEmployeeLastNameNotFound = 'ไม่พบนามสกุลพนักงาน';
  errEmployeeLastNameProhibitSpecial =
    'นามสกุลพนักงาน ห้ามมีอักขระพิเศษหรือช่องว่าง';
  errEmployeeInfoNotFound = 'ไม่พบข้อมูลพนักงาน';

  errGetSlotVisitorNumberCompanyIDNotFound = 'ไม่พบ company id';
  errGetSlotVisitorNumberCompanyIDProhibitSpecial =
    'company id ห้ามมีอักขระพิเศษหรือช่องว่าง';
  errGetSlotVisitorNumberCompanyIDNotNumber =
    'company id ต้องเป็นตัวเลขเท่านั้น';
  errGetSlotVisitorNumberSlotNumberNotFound = 'ไม่พบเลข Slot';
  errGetSlotVisitorNumberSlotNumberProhibitSpecial =
    'เลข Slot ห้ามมีอักขระพิเศษหรือช่องว่าง';
  errGetSlotVisitorNumberSlotNumberNotNumber =
    'เลข Slot ต้องเป็นตัวเลขเท่านั้น';
  errGetSlotVisitorNumberIsFail = 'ค้นหา slot ล้มเหลว';
  errGetSlotVistiorNumberNotValue = 'ไม่พบ Slot ว่าง';
  errGetSlotVisitorNumberNotInDataBase = 'ไม่พบเลข slot ในระบบ';
  errGetSlotVisitorNumberIsDuplicate = 'เลข slot ถูกใช้งานไปแล้ว';
  errGetSlotVisitorNumberIsNotCheckIn = 'เลข slot นี้ยังไม่ได้ทำรายการเข้า';

  errVisitorSlotIdNotFound = 'ไม่พบ record id ของขาเข้า';
  errVisitorSlotIdNotNumber = 'record id ต้องเป็นตัวเลขเท่านั้น';
  errVisitorSlotIdProhibitSpecial = 'record id ห้ามมีอักขระพิเศษ หรือช่องว่าง';

  errGetCardOrSlotNumberVisitor =
    'กรุณาเลือกกรอกเลขบัตร หรือเลข slot อย่างใดอย่างหนึ่ง';

  errGetHaveCardCodeAndCardName =
    'กรุณาเลือกกรอกเลขบัตร หรือทาบบัตร อย่างใดอย่างหนึ่ง';
  errGetCardNotNumber = 'เลขบัตรต้องเป็นตัวเลขเท่านั้น';
  errGetCardProhibitSpecial = 'เลขบัตรห้ามมีอักขระพิเศษ หรือช่องว่าง';
  errGetCardNotInDatabase = 'ไม่พบบัตรในระบบ';
  errGetCardIsDuplicate = 'บัตรยังไม่ได้ทำรายการออก';
  errGetCardIsNotCheckIn = 'บัตรยังไม่ได้ทำรายการเข้า';
  errGetCardIDIsFail = 'ไม่พบบัตรในระบบ';

  errCartypeCategoryNotInbase = 'ไม่พบประเภทรถในระบบ';

  errVisitorRecordIDNotFound = 'ไม่พบรหัสอ้างอิง';
  errVisitorRecordInNotFound = 'ไม่พบข้อมูลขาเข้า';
  errVisitorRecord_CodeNotFound = 'ไม่พบ Visitor code';
  errVisitorRecord_CodeProhibit = 'Visitor code ห้ามมีอักขระพิเศษ';
  errVisitorNotVerifyEstamp = 'กรุณาประทับตราก่อนออกจากโครงการ';

  errImageNotFound = 'ไม่พบรูปภาพ';
  errImageCardNotFound = 'ไม่พบรูปภาพหน้าบัตร';
  errImageVehicleNotFound = 'ไม่พบรูปภาพพาหนะ';
  errImageCustomerNotFound = 'ไม่พบรูปภาพหลักฐานการใช้บริการ';

  errHomeIDNotFound = 'ไม่พบรหัสลูกบ้าน';
  errHomeIDNotNumber = 'รหัสลูกบ้านต้องเป็นตัวเลขเท่านั้น';
  errHomeIdProhibitSpecial = 'รหัสลูกบ้านต้องเป็นตัวเลขเท่านั้น';
  errHomeIDNotInDataBase = 'ไม่พบบ้านเลขที่ในระบบ';
  errHomeGetFail = 'เรียกดูข้อมูลลูกบ้านล้มเหลว';

  errGetCompanyIDNotFound = 'ไม่พบรหัส Company';
  errGetCompanyIDNotNumber = 'รหัส Company ต้องเป็นตัวเลขเท่านั้น';
  errGetCompanyIDProhibitSpecial =
    'รหัส Company ห้ามมีอักขระพิเศษ หรือช่องว่าง';

  errGetGuardhouseIDNotFound = 'ไม่พบรหัสป้อม';
  errGetGuardhouseIDNotNumber = 'รหัสป้อมต้องเป็นตัวเลขเท่านั้น';
  errGetGuardhouseIDProhibitSpecial = 'รหัสป้อม ห้ามมีอักขระพิเศษ หรือช่องว่าง';

  errGetCarTypeFail = 'เรียกดูประเภทรถล้มเหลว';
  errGetCarTypeNotFound = 'ไม่พบรหัสประเภทรถ';
  errGetCarTypeNotNumber = 'รหัสประเภทรถต้องเป็นตัวเลขเท่านั้น';
  errGetCarTypeProhibitSpecial = 'รหัสประเภทรถห้ามมีอักขระพิเศษ หรือช่องว่าง';

  errGetCartypeCategoryFail = 'เรียกดูหมวดหมู่รถล้มเหลว';

  errGetDataActionInInfoNotFound = 'ไม่พบข้อมูลขาเข้า';

  errImagePathNotFound = 'กรุณาใส่ Path รูปภาพ';
  errImageGetFail = 'ไม่พบรูปภาพที่ร้องขอ';

  errAuthorizationNotFound = 'ไม่พบ Bearer Token สำหรับร้องขอข้อมูล';

  errPosIDNotFound = 'ไม่พบ pos id';
  errPosIDProhibitSpecial = 'pos id ห้ามมีอักขระพิเศษ หรือช่องว่าง';

  errTcplIdNotFound = 'กรุณาระบุ ID รายการคำนวณค่าจอด';
  errTcplCodeNotFound = 'กรุณาระบุรหัสรายการคำนวณค่าจอด';
  errTcplCodeProhibitSpecial = 'รหัสรายการคำนวณค่าจอดห้ามมีอักษรพิเศษ';
  errTcplNotInBase = 'ไม่พบรายการคำนวณค่าจอดในระบบ';
  errTotalAmountMoreThanZeroCanNotUsePaymentTypeZero =
    'ประเภทการชำระเงินไม่ถูกต้อง เนื่องจากมีค่าจอด';
  errTotalAmountEqualZeroCanNotUsePaymentTypeNotEqualZero =
    'ประเภทการชำระเงินไม่ถูกต้อง เนื่องจากไม่มียอดเงิน';

  errPriceOfCardlossNotFound = 'ไม่พบค่าปรับบัตรหาย';
  errPriceOfCardlossProhibitSpecial =
    'ค่าปรับบัตรหายห้ามมีอักขระพิเศษ หรือช่องว่าง';
  errPriceOfCardlossNotNumber = 'ค่าปรับบัตรหายต้องเป็นตัวเลขเท่านั้น';

  errCustomerPaymentNotFound = 'ไม่พบจำนวนเงินที่ลูกค้าชำระบริการ';
  errCustomerPaymentProhibitSpecial =
    'จำนวนเงินที่ลูกค้าชำระบริการห้ามมีอักขระพิเศษ หรือช่องว่าง';
  errCustomerPaymentNotNumber =
    'จำนวนเงินที่ลูกค้าชำระบริการต้องเป็นตัวเลขเท่านั้น';

  errChangeMoneyNotFound = 'ไม่พบจำนวนเงินทอน';
  errChangeMoneyProhibitSpecial = 'จำนวนเงินทอนห้ามมีอักขระพิเศษ หรือช่องว่าง';
  errChangeMoneyNotNumber = 'จำนวนเงินทอนต้องเป็นตัวเลขเท่านั้น';

  errPaymentIncomplete = 'ชำระเงินไม่ครบถ้วน';

  errCardlossCardIDBeforeNotFound = 'ไม่พบ ID ของบัตรที่หาย';
  errCardlossCardIDBeforeProhibitSpecial =
    'ID ของบัตรที่หายห้ามมีอักขระพิเศษ หรือช่องว่าง';
  errCardlossCardIDBeforeNotNumber = 'ID ของบัตรหายต้องเป็นตัวเลขเท่านั้น';
  errCardlossCardCodeBeforeNotFound = 'ไม่พบรหัสบัตรที่หาย';
  errCardlossCardCodeBeforeProhibitSpecial =
    'รหัสบัตรที่หายห้ามมีอักขระพิเศษ หรือช่องว่าง';
  errCardlossCardCodeBeforeNotNumber = 'รหัสบัตรหายต้องเป็นตัวเลขเท่านั้น';
  errCardlossCardNameBeforeNotFound = 'ไม่พบเลขบัตรที่หาย';
  errCardlossCardNameBeforeProhibitSpecial =
    'เลขบัตรที่หายห้ามมีอักขระพิเศษ หรือช่องว่าง';
  errCardlossCardNameBeforeNotNumber = 'เลขบัตรหายต้องเป็นตัวเลขเท่านั้น';
  errCardLossCardBeforeIsNotCheckIn = 'บัตรที่หายไม่ได้ทำรายการเข้า';
  errCardLossCardBeforeNotInDatabase = 'ไม่พบข้อมูลบัตรที่หายอยู่ในระบบ';

  errCardlossCardIDAfterNotFound = 'ไม่พบ ID ของบัตรใหม่';
  errCardlossCardIDAfterProhibitSpecial =
    'ID ของบัตรใหม่ห้ามมีอักขระพิเศษ หรือช่องว่าง';
  errCardlossCardIDAfterNotNumber = 'ID ของบัตรใหม่ต้องเป็นตัวเลขเท่านั้น';
  errCardlossCardCodeAfterNotFound = 'ไม่พบรหัสบัตรใหม่';
  errCardlossCardCodeAfterProhibitSpecial =
    'รหัสของบัตรใหม่ห้ามมีอักขระพิเศษ หรือช่องว่าง';
  errCardlossCardCodeAfterNotNumber = 'รหัสของบัตรใหม่ต้องเป็นตัวเลขเท่านั้น';
  errCardlossCardNameAfterNotFound = 'ไม่พบเลขบัตรใหม่';
  errCardlossCardNameAfterProhibitSpecial =
    'เลขบัตรใหม่ห้ามมีอักขระพิเศษ หรือช่องว่าง';
  errCardlossCardNameAfterNotNumber = 'เลขบัตรใหม่ต้องเป็นตัวเลขเท่านั้น';
  errCardLossCardAfterNotInDatabase = 'ไม่พบข้อมูลบัตรใหม่อยู่ในระบบ';
  errCardLossCardAfterIsNotCheckIn = 'บัตรใหม่ถูกงานใช้อยู่แล้ว';

  errVisitorRecordCodeNotFound = 'ไม่พบ uuid สำหรับขอพิมพ์ใบเสร็จ';
  errSlipInGetNotRow = 'ไม่พบข้อมูลขาเข้า';
  errSlipOutGetNotRow = 'ไม่พบข้อมูล Visitor ที่ทำรายการออก';

  errฺBookingTbvCodeNotFound = 'ไม่พบ QR Code จากการจอง';
  errฺBookingTbvCodeProhibitSpecial = 'QR Code ห้ามมีอักขระพิเศษ หรือช่องว่าง';
  errBookingNotFound = 'ไม่พบข้อมูลการจอง หรือหมดเวลาจองไปแล้ว';
  errBookingLicenseIsDuplicate =
    'มีการจองทะเบียนรถนี้ซ้ำในระบบ กรุณาสแกน QR Code เพื่อยืนยันตนอีกครั้ง';
  errBookingQRNotFound = 'ไม่พบ QR Code ในระบบ';
  errBookingQRCodeNotIn = 'QR Code ไม่ได้ทำรายการเข้า';
  errBookingIsUse = 'QR Code นี้ถูกใช้งานไปแล้ว';

  errLicenseplateNotIn = 'ไม่พบทะเบียนทำรายการเข้า';
  errLicenseplateInThanMoreOneRecord =
    'ทะเบียนที่ทำรายการเข้ามีมากกว่า 1 คันในระบบ';
  errLicensePlateOutFailed = 'ทำรายการด้วยทะเบียนล้มเหลว';

  errBookingGetError = 'ตรวจสอบ Booking Error กรุณาติดต่อเจ้าหน้าที่';
  errBookingNotVerifyEstamp = 'กรุณาประทับตราก่อนออกจากโครงการ';

  errNotCardAndSlotAndQrcode =
    'กรุณาระบุบัตร หรือเลข slot หรือ รหัสจอง QR-Code อย่างใดอย่างหนึ่ง';
  errSelectCardAndSlotAndQrcode =
    'กรุณาเลือกใช้บัตร หรือเลข slot หรือ รหัสจอง QR-Code อย่างใดอย่างหนึ่ง';

  errEstampIDNotFound = 'ไม่พบรหัสตราประทับ';
  errEstampNotInBase = 'ไม่พบรหัสตราประทับในระบบ';
  errEstampIDProhibitSpecial = 'รหัสตราประทับห้ามมีอักขระพิเศษ หรือช่องว่าง';
  errEstampIDNotNumber = 'รหัสตราประทับต้องเป็นตัวเลขเท่านั้น';

  errSosIdNotfound = 'ไม่พบรหัสแจ้งเตือนฉุกเฉิน';
  errSosIdProhibitSpecial =
    'รหัสแจ้งเตือนฉุกเฉิน ห้ามมีอักขระพิเศษ หรือช่องว่าง';
  errSosIdNotNumber = 'รหัสแจ้งเตือนฉุกเฉินต้องเป็นตัวเลขเท่านั้น';
  errSosNotInbase = 'ไม่พบการแจ้งเตือนฉุกเฉินในระบบ';
  errSosActionDuplicate = 'การแจ้งเตือนฉุกเฉินถูกอนุมัติไปแล้ว';
  errRemarkNofound = 'กรุณากรอกหมายเหตุ';
  errReamrkPohibitSpecial = 'หมายเหตุ ห้ามมีอักขระพิเศษ';

  errParcelReceiveTitleNotFound = 'กรุณาระบุหัวข้อการรับพัสดุ';
  errParcelReceiveTitleProhitbitSpecial = 'หัวข้อการรับพัสดุ ห้ามมีอักขระพิเศษ';
  errParcelRecieveDetailProhibitSpecial =
    'รายละเอียดการรับพัสดุ ห้ามมีอักขระพิเศษ';
  errReceiveParcelDetailNotFound = 'กรุณาระบุรายละเอียดของพัสดุ';
  errRecieveParcelDetailProhibitSpecial =
    'รายะละเอียดของพัสดุ ห้ามมีอักขระพิเศษ';
  errSendParcelDetailNotfound = 'กรุณาระบุรายละเอียดการส่งมอบพัสดุ';
  errSendParcelDetailProhitbitSpecial =
    'ละเอียดการส่งมอบพัสดุ ห้ามมีอักขระพิเศษ';

  errVisitorPendantNotInBase = 'ไม่พบรายการเข้าในระบบ';
  errTcplNotNumber = 'รหัส TCPL ต้องเป็นตัวเลขเท่านั้น';
  errTcplProhitbitSpecial = 'รหัส TCPL ห้ามมีอักขระพิเศษ หรือช่องว่าง';
  errSumParkingNotNumber = 'ค่าจอดต้องเป็นตัวเลขเท่านั้น';
  errSumParkingProhitbitSpecial = 'ค่าจอด ห้ามมีอักขระพิเศษ หรือช่องว่าง';
  errOverFineNotNumber = 'ค่าปรับบัตรหายต้องเป็นตัวเลขเท่านั้น';
  errOverFineProhitbitSpecial = `ค่าปรับบัตรหาย ห้ามมีอักขระพิเศษ หรือช่องว่าง`;
  errPaymentTypeIdNotNumber = 'รหัสประเภทการจ่ายเงินต้องเป็นตัวเลขเท่านั้น';
  errPaymentTypeIdProhitbitSpecial = `รหัสประเภทการจ่ายเงิน ห้ามมีอักขระพิเศษ หรือช่องว่าง`;
  errPaymentTypeIdNotInBase = 'ประเภทการชำระเงินไม่ถูกต้อง';

  errLicensePlateNotFound = 'ไม่พบทะเบียนรถ';
  errLicensePlateProhibitSpecial = 'ทะเบียนรถ ห้ามมีอักขระพิเศษ';

  errDateTimeStartNotFound = 'ไม่พบวันที่ค้นหาเริ่มต้น';
  errDateTimeStartFormatInvalid =
    'รูปแบบ วันที่ค้นหาเริ่มต้นไม่ถูกต้อง รูปแบบวันที่จะต้องเป็น (YYYY-MM-DD HH:mm:ss)';
  errDateTimeEndNotFound = 'ไม่พบวันที่ค้นหาสิ้นสุด';
  errDateTimeEndFormatInvalid =
    'รูปแบบ วันที่ค้นหาสิ้นสุดไม่ถูกต้อง รูปแบบวันที่จะต้องเป็น (YYYY-MM-DD HH:mm:ss)';
  errDateTimeStartOverTimeEnd =
    'วันที่ค้นหาเริ่มต้น จะต้องน้อยกว่าวันที่ค้นหาสิ้นสุด';
  errDateTimeSearchOver31Days = 'ช่วงเวลาในการค้นหาต้องไม่เกิน 31 วัน';

  errNotPay = 'กรุณาชำระค่าบริการก่อน'
}
