class Api {


    @inject("enviroment") public var enviroment:String = 'd';


    public function new() {}
    public function doDefault() trace(enviroment);

    function doUser() {
      trace(1);
        trace(enviroment);
    }
}
