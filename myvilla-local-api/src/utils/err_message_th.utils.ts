export class ErrMessageUtilsTH{

    messageSuccess ='เรียบร้อย'
    messageProcessFail = 'ล้มเหลว'

    errSiteIDNotFound = 'ไม่พบรหัสหมู่บ้าน'
    errSiteIDNotNumber = 'รหัสหมู่บ้านต้องเป็นตัวเลยเท่านั้น'
    errSiteIDProhibitSpecial = 'รหัสหมู่บ้านห้ามมีอักขระพิเศษ'
    errSiteCodeProhibitSpecial = 'โค้ดหมู่บ้านห้ามีอักขระพิเศษ'
    errGuardHouseIDNotFound = 'ไม่พบรหัสป้อม'
    errGuardHouseIDNotNumber = 'รหัสป้อมต้องเป็นตัวเลขเท่านั้น'
    errGuardHouseIDProhibitSpecial = 'รหัสป้อมห้ามมีอักชระพิเศษ'
    errGuardHouseCodeProhibitSpecial = 'โค้ดป้อมห้ามมีอักขระพิเศษ'

    errVisitorSlotRunningIdNotFound = 'ไม่พบ visitor_slot_running_id'
    errVisitorSlotRunningIdNotNumber = 'visitor_slot_running_id ต้องเป็นตัวเลขเท่านั้น'
    errVisitorCartypeIDNotfound = 'ไม่พบรหัสประเภทรถ'
    errVisitorCartypeIDProhibitSpecail = 'รหัสประเภทรถห้ามมีอักขระพิเศษ'
    errVisitorCartypeIDNotNumber = 'รหัสประเภทรถต้องเป็นตัวเลขเท่านั้น'
    errVisitorCartypeNameContractionNotFound = 'ไม่พบอักษรย่อของประเภทรถ'
    errVisitorCartypeNameContractionProhibitSpecial ='อักษรย่อของประเภทรถ ห้ามมีอักขระพิเศษหรือช่องว่าง'
    errVisitorCartypeNameThNotFound = 'ไม่พบประเภทรถ (ชื่อไทย)'
    errVisitorCartypeNameThProhibitSpecial = 'ประเภทรถ (ชื่อไทย) ห้ามมีอักขระพิเศษหรือช่องว่าง'
    errVisitorCartypeNameEnNotFound = 'ไม่พบประเภทรถ (ชื่ออังกฤษ)'
    errVisitorCartypeNameEnProhibitSpecial = 'ปรเภทรถ (ชื่ออังกฤษ) ห้ามมีอักขระพิเศษหรือช่องว่าง'

    errVisitorInfoNotFound = 'ไม่พบข้อมูลของ Visitor'
    errVisitorInfoPrefixNameNotFound = 'ไม่พบคำนำหน้าชื่อ Visitor'
    errVisitorInfoPrefixNameProhibitSpecial = 'คำนำหน้าชื่อ Visitor ห้ามมีอักขระพิเศษหรือช่องว่าง'
    errVisitorInfoFirstNameNotFound = 'ไม่พบชื่อของ Visitor'
    errVisitorInfoFirstNameProhibitSpecial = 'ชื่อของ Visitor ห้ามมีอักขระพิเศษหรือช่องว่าง'
    errVisitorInfoLastNameNotFound = 'ไม่พบนามสกุลของ Visitor'
    errVisitorInfoLastNameProhibitSpecial = 'นามสกุลของ Visiotr ห้ามมีอักขระพิเศษหรือช่องว่าง'
    errVisitorInfoBirthDateNotFound = 'ไม่พบวัน-เดือน-ปี เกิด ของ Visitor'
    errVisitorInfoIdentityNotFound = 'ไม่พบรหัสประจำตัวประชาชน'
    errVisitorInfoIdentityNotNumber = 'รหัสประจำตัวประชาชนต้องเป็นตัวเลขเท่านั้น'
    errVisitorInfoIdentityFormatNotValid = 'รูปแบบรหัสประชำตัวประชาชนไม่ถูกต้อง'

    errEmployeeIDNotFound = 'ไม่พบไอดีพนักงาน'
    errEmployeeIDNotNumber = 'ไอดีพนักงานต้องเป็นตัวเลขเท่านั้น'
    errEmployeeIDProhibitSpecail = 'ไอดีพนักงานห้ามมีอักขระพิเศษ'
    errEmployeeIDNotInDatabase = 'ไม่พบพนักงานในระบบ'
    errEmployeeCodeNotFound = 'ไม่พบรหัสพนักงาน'
    errEmployeeFirstNameNotFound = 'ไม่พบชื่อพนักงาน'
    errEmployeeFitstNameProhibitSpecial = 'ชื่อพนักงาน ห้ามมีอักขระพิเศษหรือช่องว่าง'
    errEmployeeLastNameNotFound = 'ไม่พบนามสกุลพนักงาน'
    errEmployeeLastNameProhibitSpecial = 'นามสกุลพนักงาน ห้ามมีอักขระพิเศษหรือช่องว่าง'
    errEmployeeInfoNotFound = 'ไม่พบข้อมูลพนักงาน'

    errGetSlotVisitorNumberSiteIDNotFound = 'ไม่พบ site id'
    errGetSlotVisitorNumberSiteIDProhibitSpecial = 'site id ห้ามมีอักขระพิเศษหรือช่องว่าง'
    errGetSlotVisitorNumberSiteIDNotNumber ='site id ต้องเป็นตัวเลขเท่านั้น'
    errGetSlotVisitorNumberSlotNumberNotFound = 'ไม่พบเลข Slot'
    errGetSlotVisitorNumberSlotNumberProhibitSpecial = 'เลข Slot ห้ามมีอักขระพิเศษหรือช่องว่าง'
    errGetSlotVisitorNumberSlotNumberNotNumber ='เลข Slot ต้องเป็นตัวเลขเท่านั้น'
    errGetSlotVisitorNumberIsFail = 'ค้นหา slot ล้มเหลว'
    errGetSlotVistiorNumberNotValue = 'ไม่พบ Slot ว่าง'
    errGetSlotVisitorNumberNotInDataBase = 'ไม่พบเลข slot ในระบบ'
    errGetSlotVisitorNumberIsDuplicate = 'เลข slot ถูกใช้งานไปแล้ว'
    errGetSlotVisitorNumberIsNotCheckIn = 'เลข slot นี้ยังไม่ได้ทำรายการเข้า'

    errVisitorSlotIdNotFound = 'ไม่พบ record id ของขาเข้า'
    errVisitorSlotIdNotNumber = 'record id ต้องเป็นตัวเลขเท่านั้น'
    errVisitorSlotIdProhibitSpecial = 'record id ห้ามมีอักขระพิเศษ หรือช่องว่าง'

    errGetCardOrSlotNumberVisitor = 'กรุณาเลือกกรอกเลขบัตร หรือเลข slot อย่างใดอย่างหนึ่ง'
    
    errGetHaveCardCodeAndCardName = 'กรุณาเลือกกรอกเลขบัตร หรือทาบบัตร อย่างใดอย่างหนึ่ง'
    errGetCardNotNumber = 'เลขบัตรต้องเป็นตัวเลขเท่านั้น'
    errGetCardProhibitSpecial = 'เลขบัตรห้ามมีอักขระพิเศษ หรือช่องว่าง'
    errGetCardNotInDatabase = 'ไม่พบบัตรในระบบ'
    errGetCardIsDuplicate = 'บัตรยังไม่ได้ทำรายการออก'
    errGetCardIsNotCheckIn = 'บัตรยังไม่ได้ทำรายการเข้า'
    errGetCardIDIsFail = 'ค้นหาบัตรล้มเหลว'

    errVisitorRecordIDNotFound = 'ไม่พบรหัสอ้างอิง'
    errVisitorRecordInNotFound = 'ไม่พบข้อมูลขาเข้า'

    

    errImageNotFound = 'ไม่พบรูปภาพ';
    errImageCardNotFound = 'ไม่พบรูปภาพหน้าบัตร'
    errImageVehicleNotFound = 'ไม่พบรูปภาพพาหนะ'

    errHomeIDNotFound = 'ไม่พบรหัสลูกบ้าน'
    errHomeIDNotNumber = 'รหัสลูกบ้านต้องเป็นตัวเลขเท่านั้น'
    errHomeIdProhibitSpecial = 'รหัสลูกบ้านต้องเป็นตัวเลขเท่านั้น'
    errHomeIDNotInDataBase = 'ไม่พบบ้านเลขที่ในระบบ'
    errHomeGetFail = 'เรียกดูข้อมูลลูกบ้านล้มเหลว'

    errGetSiteIDNotFound = 'ไม่พบรหัส Site'
    errGetSiteIDNotNumber = 'รหัส Site ต้องเป็นตัวเลขเท่านั้น'
    errGetSiteIDProhibitSpecial = 'รหัส Site ห้ามมีอักขระพิเศษ หรือช่องว่าง'
    
    errGetGuardhouseIDNotFound = 'ไม่พบรหัสป้อม'
    errGetGuardhouseIDNotNumber = 'รหัสป้อมต้องเป็นตัวเลขเท่านั้น'
    errGetGuardhouseIDProhibitSpecial = 'รหัสป้อม ห้ามมีอักขระพิเศษ หรือช่องว่าง'

    errGetCarTypeFail = 'เรียกดูประเภทรถล้มเหลว'
    errGetCarTypeNotFound = 'ไม่พบรหัสประเภทรถ'
    errGetCarTypeNotNumber = 'รหัสประเภทรถต้องเป็นตัวเลขเท่านั้น'
    errGetCarTypeProhibitSpecial = 'รหัสประเภทรถห้ามมีอักขระพิเศษ หรือช่องว่าง'
   
    errGetCartypeCategoryFail = 'เรียกดูหมวดหมู่รถล้มเหลว'

    errGetDataActionInInfoNotFound = 'ไม่พบข้อมูลขาเข้า'

    errImagePathNotFound = 'กรุณาใส่ Path รูปภาพ'
    errImageGetFail = 'ไม่พบรูปภาพที่ร้องขอ'
    
    errAuthorizationNotFound = 'ไม่พบ Bearer Token สำหรับร้องขอข้อมูล'

    
}