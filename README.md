# @zerm/defer

```ts
import { Deferrer } from "@zerm/defer";

{
    using d = new Deferrer();

    d.defer(() => console.log("Cleanup A"));
    d.defer(() => console.log("Cleanup B"));

    console.log("Do some work");
}
```

In the above example, the following will happen:

1. The scope is entered.
2. "Do some work" is printed.
3. The scope is exited.
4. "Cleanup B" is printed.
5. "Cleanup A" is printed.
