function a() {
  console.log("[nestNumber] 1");

  function b() {
    console.log("[nestNumber] 2");

    function d() {
      console.log("[nestNumber] 3");

      function e() {
        console.log("[nestNumber] 4");
      }
    }
  }

  function c() {
    console.log("[nestNumber] 2");

    function d() {
      console.log("[nestNumber] 3");

      function e() {
        console.log("[nestNumber] 4");

        function gg() {
          console.log("[nestNumber] 5");
        }
      }
    }
  }
}