import pushstate.PushState;
import haxe.web.Dispatch;
import minject.Injector;
using tink.CoreApi;
import Api;


@:tink class Main {

  @:signal  var signal:String;

  public static function new() {
    var handlers:SignalTrigger<String>;

    signal = handlers = Signal.trigger();

    @whenever(signal.gather()) @do(v) {
      var injector = new Injector();
      injector.map(String,'enviroment').toValue('fff');

      if (v =='/pippa.html') v = "";

      var api:Api = injector.instantiate(Api);
      Dispatch.run(v,new Map(),api);
    }

    PushState.addEventListener() => @do(url)  {
      trace(url);
      handlers.trigger(url);
    }
  }

  public static function main() {

    PushState.init();
    new Main();


  }
}
