import {BasicRemoteRepository, AuthUser} from "@domoskanonos/frontend-basis";

export class UserRepository extends BasicRemoteRepository<AuthUser> {

    private static uniqueInstance: UserRepository;

    constructor() {
        super("/AUTHUSER");
    }

    static getUniqueInstance() {
        if (!UserRepository.uniqueInstance) {
            UserRepository.uniqueInstance = new UserRepository();
        }
        return UserRepository.uniqueInstance;
    }

}