"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AvailableItemsCreateComponent = void 0;
var operators_1 = require("rxjs/operators");
var core_1 = require("@angular/core");
var AvailableItemsCreateComponent = /** @class */ (function () {
    function AvailableItemsCreateComponent(serversService, route, formBuilder, router) {
        this.serversService = serversService;
        this.route = route;
        this.formBuilder = formBuilder;
        this.router = router;
        this["false"] = false;
        this["true"] = true;
    }
    AvailableItemsCreateComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.form = this.formBuilder.group({
            name: [''],
            health: [0],
            vest: [0],
            experience: [0],
            hungry: [0],
            money: [0],
            statusPoint: [0],
            quantityInitial: [0],
            isInitial: [false],
            isVirtual: [false]
        });
        this.serverId = this.route.snapshot.paramMap.get('id');
        this.itId = this.route.snapshot.paramMap.get('itid');
        this.serversService
            .getServerById(this.serverId)
            .pipe(operators_1.take(1))
            .subscribe(function (data) {
            _this.availableItems = data.availableItems;
            data.availableItems.forEach(function (items) {
                if (items.id === _this.itId) {
                    _this.form = _this.formBuilder.group(items);
                    console.log(_this.form.value);
                }
            });
        });
    };
    AvailableItemsCreateComponent.prototype.create = function () {
        var _this = this;
        var id = "00000000-0000-0000-0000-000000000000";
        this.availableItems.forEach(function (x) {
            x.id = id;
        });
        this.availableItems.push(this.form.value);
        console.log(this.availableItems);
        this.serversService.updateAvailableItems(this.serverId, this.availableItems)
            .pipe(operators_1.take(1))
            .subscribe(function (res) {
            console.log('availableItem criado', res);
            _this.router.navigate(['/servers/', _this.serverId, 'availableitems']);
        });
    };
    AvailableItemsCreateComponent = __decorate([
        core_1.Component({
            selector: 'app-available-items-create',
            templateUrl: './available-items-create.component.html',
            styleUrls: ['./available-items-create.component.scss']
        })
    ], AvailableItemsCreateComponent);
    return AvailableItemsCreateComponent;
}());
exports.AvailableItemsCreateComponent = AvailableItemsCreateComponent;
