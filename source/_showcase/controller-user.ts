import {BasicRemoteRepository, AuthUser} from "@domoskanonos/frontend-basis";
import {HttpClientService} from "@domoskanonos/frontend-basis/source/http-client-service";

export class UserRepository extends BasicRemoteRepository<AuthUser, Number> {

    private static uniqueInstance: UserRepository;

    constructor() {
        super(HttpClientService.getUniqueInstance(), "/AUTHUSER");
    }

    static getUniqueInstance() {
        if (!UserRepository.uniqueInstance) {
            UserRepository.uniqueInstance = new UserRepository();
        }
        return UserRepository.uniqueInstance;
    }

}