function a() {
  console.log("[nestNumber] undefined1");

  function b() {
    console.log("[nestNumber] undefined11");

    function d() {
      console.log("[nestNumber] undefined111");

      function e() {
        console.log("[nestNumber] undefined1111");
      }
    }
  }

  function c() {
    console.log("[nestNumber] undefined11111");

    function d() {
      console.log("[nestNumber] undefined111111");

      function e() {
        console.log("[nestNumber] undefined1111111");

        function gg() {
          console.log("[nestNumber] undefined11111111");
        }
      }
    }
  }
}