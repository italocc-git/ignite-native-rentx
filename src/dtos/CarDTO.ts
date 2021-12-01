import {Car as ModelCar} from '../database/model/Car'

export interface CarData  {
    id : string;
    brand :string;
    name: string;
    about : string;
    period: string;
    price: number;
    fuel_type: svgType;
    accessories : Accessories[]
    thumbnail : string;
    photos : Photos[]
}

type Accessories = {
    id : string;
    type:svgType;
    name: string;
}

type Photos = {
    id: string;
    photo : string;
}

export type svgType = 'speed' | 'acceleration' | 'turning_diameter' | 'gasoline_motor' | 'electric_motor' | 
'hybrid_motor' | 'exchange' | 'seats'

export interface RouteParams {
    car : ModelCar;
    dates : string[];
}
