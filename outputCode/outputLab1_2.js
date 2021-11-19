function foo(a) {
  console.log("[enter] function foo");

  if (a > 10) {
    {
      console.log("[exit] function");
      return true;
    }
  } else {
    {
      console.log("[exit] function");
      return false;
    }
  }
}