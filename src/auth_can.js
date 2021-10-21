class Auth_can{
    constructor()
    {
        this.auth_can = false;
    }

    login(cb){
        this.auth_can = true;
        cb();
    }

    logout(cb)
    {
        this.auth_can = false;
        cb();
    }

    isAuth_can(){
        return this.auth_can;
    }

}
export default new Auth_can();