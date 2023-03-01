import { Injectable } from '@angular/core';
import {  FusionAuthClient } from '@fusionauth/typescript-client';

@Injectable({
  providedIn: 'root',
})
export class FusionauthClientService {
  endpoint = 'http://localhost:9011/api'
  client  = new FusionAuthClient('A43cX_5T_YgDfVcgNQUHbhL3HARHIod6wdeuyGt-l4aErYEoX5z8Au_l','http://localhost:9011');
}
