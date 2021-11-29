import {Model } from '@nozbe/watermelondb'
import {field} from '@nozbe/watermelondb/decorators'

class User extends Model {
    static table = 'users'  //table Name

    @field('user_id') /* Name of the field in the  Database Table */
    user_id!: string; /* ensuring that the user_id has a value when the app starts  */

    @field('name')
    name !:string;

    @field('email')
    email !: string;

    @field('driver_license')
    driver_license !:string;

    @field('avatar')
    avatar !: string;

    @field('token')
    token !: string;
}

export { User}