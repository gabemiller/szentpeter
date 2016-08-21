import {bootstrap} from '@angular/platform-browser-dynamic';
import {enableProdMode} from '@angular/core';
import {AppComponent, MaintenanceComponent, CONFIG} from './app';


if (CONFIG.isProductionModeActive) {
    enableProdMode();
}

if (CONFIG.isMaintenanceModeActive) {
    bootstrap(MaintenanceComponent, []);
} else {
    bootstrap(AppComponent, []);
}