import { Injectable } from '@angular/core';
import { Cities } from './cities';
@Injectable()
export class Reponse {
    input: string;
    cities:Cities[];
}