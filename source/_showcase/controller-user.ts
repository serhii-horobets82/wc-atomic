import {BasicRemoteRepository, AuthUser} from "@domoskanonos/frontend-basis";

export class UserRepository extends BasicRemoteRepository<AuthUser> {

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