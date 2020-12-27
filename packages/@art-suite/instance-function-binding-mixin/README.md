# ArtSuite: InstanceFunctionBindingMixin

Mix into your class to add the ability to, at your discretion, bind all instance-functions on an instance to that instance. Henceforth, you can use those functions without the instance and yet they will still have access to all the instance's data. This is used in ArtReact and ArtFlux (ArtSuite/Models) to make it easy to read-out instance functions and pass them to other components.

Bonus: This has basic hotreloading support. That means, if you add instance-creation-tracking (as ArtReact does) you can update all instances when a class is reloaded with added, updated or removed instance methods.

See tests for examples.