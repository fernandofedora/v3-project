import { RolesEnum } from '../enums/roles.enum';
import { UserDto } from '../dto/user.dto';


export function storeOwnerRoleValidation(user: UserDto, validNode: string) {
    if (user.role === RolesEnum.storeOwner) {
        return user.node === validNode;
    }

    return true;
}
