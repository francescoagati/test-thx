import pushstate.PushState;
import haxe.web.Dispatch;

using tink.CoreApi;


class Api {
    public function new() {
    }
    function doUser() {
        trace("CALLED");
    }
}
//.....



@:tink class Main {

  @:signal  var signal:String;

  public static function new() {
    var handlers:SignalTrigger<String>;

    signal = handlers = Signal.trigger();
    @when(signal.next()) @do(v) Dispatch.run(v,new Map(),new Api());


    PushState.addEventListener() => @do(url)  handlers.trigger(url);

  }

  public static function main() {

    PushState.init();
    new Main();


  }
}
