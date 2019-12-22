import {AbstractCRUDRepository, AuthUser} from "@domoskanonos/frontend-basis";

export class UserRepository extends AbstractCRUDRepository<AuthUser> {

    private static instance: UserRepository;

    constructor() {
        super("/AUTHUSER");
    }

    static getInstance() {
        if (!UserRepository.instance) {
            UserRepository.instance = new UserRepository();
        }
        return UserRepository.instance;
    }

}