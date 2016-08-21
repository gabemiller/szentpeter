import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app',
    templateUrl: '../partials/maintenance.html'
})
export class MaintenanceComponent implements OnInit{
    maintenance = {
      title: 'Dicsőség Jézus Krisztusnak!',
      text: 'Az oldalunk jelenleg karbantartás alatt áll.<br> Kérjük, látogasson vissza később!'
    };
    ngOnInit() {

    }
}