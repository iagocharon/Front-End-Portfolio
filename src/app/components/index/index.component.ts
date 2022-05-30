import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css'],
})
export class IndexComponent implements OnInit {
  isLogged: boolean = false;
  route: string = this.activatedRoute.snapshot.paramMap.get('usuario')!;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
  }
}
