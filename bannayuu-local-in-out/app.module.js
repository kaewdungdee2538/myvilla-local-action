"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const b_action_in_module_1 = require("./controller/booking/b-action-in/b-action-in.module");
const b_action_out_module_1 = require("./controller/booking/b-action-out/b-action-out.module");
const get_booking_info_module_1 = require("./controller/booking/get-booking-info/get-booking-info.module");
const get_booking_out_info_module_1 = require("./controller/booking/get-booking-out-info/get-booking-out-info.module");
const get_image_module_1 = require("./controller/image/get-image/get-image.module");
const b_check_in_module_1 = require("./controller/lpr/b-check-in/b-check-in.module");
const b_check_out_module_1 = require("./controller/lpr/b-check-out/b-check-out.module");
const lpt_b_save_in_module_1 = require("./controller/lpr/lpt-b-save-in/lpt-b-save-in.module");
const lpt_b_save_out_module_1 = require("./controller/lpr/lpt-b-save-out/lpt-b-save-out.module");
const parcel_module_1 = require("./controller/parcel/parcel.module");
const reset_visitor_module_1 = require("./controller/reset-data/reset-visitor/reset-visitor.module");
const sos_module_1 = require("./controller/sos/sos/sos.module");
const action_in_module_1 = require("./controller/visitor/action-in/action-in.module");
const get_in_module_1 = require("./controller/visitor/action-out/get-in/get-in.module");
const action_out_module_1 = require("./controller/visitor/action-out/save/action-out.module");
const visitor_get_priceofcardloss_module_1 = require("./controller/visitor/card-loss/visitor-get-priceofcardloss/visitor-get-priceofcardloss.module");
const visitor_save_cardloss_module_1 = require("./controller/visitor/card-loss/visitor-save-cardloss/visitor-save-cardloss.module");
const check_card_module_1 = require("./controller/visitor/check-card/check-card.module");
const vs_estamp_module_1 = require("./controller/visitor/estamp/vs-estamp.module");
const get_cartype_category_all_module_1 = require("./controller/visitor/get-cartype-category-all/get-cartype-category-all.module");
const get_cartype_category_module_1 = require("./controller/visitor/get-cartype-category/get-cartype-category.module");
const get_cartype_module_1 = require("./controller/visitor/get-cartype/get-cartype.module");
const get_department_type_module_1 = require("./controller/visitor/get-department-type/get-department-type.module");
const get_home_module_1 = require("./controller/visitor/get-home/get-home.module");
const get_individual_type_module_1 = require("./controller/visitor/get-individual-type/get-individual-type.module");
const get_slip_module_1 = require("./controller/visitor/get-slip/get-slip.module");
const get_slot_module_1 = require("./controller/visitor/get-slot/get-slot.module");
const visitor_pendant_module_1 = require("./controller/visitor/visitor-pendant/visitor-pendant.module");
const logger_middleware_1 = require("./middleware/logger.middleware");
const get_visitor_out_history_module_1 = require("./get-visitor-out-history/get-visitor-out-history.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(logger_middleware_1.loggerMiddleware)
            .forRoutes('*');
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            auth_module_1.AuthModule,
            action_in_module_1.ActionInModule,
            get_slot_module_1.GetSlotModule,
            get_home_module_1.GetHomeModule,
            get_cartype_module_1.GetCartypeModule,
            get_cartype_category_module_1.GetCartypeCategoryModule,
            get_in_module_1.GetInModule,
            get_image_module_1.GetImageModule,
            action_out_module_1.ActionOutSaveModule,
            get_department_type_module_1.GetDepartmentTypeModule,
            get_individual_type_module_1.GetIndividualTypeModule,
            reset_visitor_module_1.ResetVisitorModule,
            visitor_pendant_module_1.VisitorPendantModule,
            visitor_get_priceofcardloss_module_1.VisitorGetPriceofcardlossModule,
            visitor_save_cardloss_module_1.VisitorSaveCardlossModule,
            check_card_module_1.CheckCardModule,
            get_slip_module_1.GetSlipModule,
            b_action_in_module_1.BActionInModule,
            get_booking_info_module_1.GetBookingInfoModule,
            get_booking_out_info_module_1.GetBookingOutInfoModule,
            b_action_out_module_1.BActionOutModule,
            get_cartype_category_all_module_1.GetCartypeCategoryAllModule,
            vs_estamp_module_1.VsEstampModule,
            sos_module_1.SosModule,
            parcel_module_1.ParcelModule,
            b_check_in_module_1.LPRBCheckInModule,
            b_check_out_module_1.LPRBCheckOutModule,
            lpt_b_save_in_module_1.LptBSaveInModule,
            lpt_b_save_out_module_1.LptBSaveOutModule, get_visitor_out_history_module_1.GetVisitorOutHistoryModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map