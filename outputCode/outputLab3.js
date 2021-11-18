// shadow function & selective instrumentation
// [prisma inst flag]
{
  // shadow function & selective instrumentation
  // [prisma inst flag]
  function u() {
    console.log("[enter] function u");
    console.log("[enter] function u");
    return 7;
    console.log("[exit ] function u");
  } // [prisma inst flag]


  // shadow function & selective instrumentation
  // [prisma inst flag]
  function u1() {
    console.log("[enter] function u1");
    console.log("[enter] function u");
    return 7;
    console.log("[exit ] function u1");
  } // [prisma inst flag]

} // [prisma inst flag]

{
  // [prisma inst flag]
  function a() {
    console.log("[enter] function a");
    console.log("[enter] function a");
    return 1;
    console.log("[exit ] function a");
  }

  // [prisma inst flag]
  function a1() {
    console.log("[enter] function a1");
    console.log("[enter] function a");
    return 1;
    console.log("[exit ] function a1");
  }
}

function b() {
  return 2;
}

function c() {
  return 3;
} // [prisma inst flag]


{
  // [prisma inst flag]
  function d() {
    console.log("[enter] function d");
    console.log("[enter] function d");
    return 4;
    console.log("[exit ] function d");
  }

  // [prisma inst flag]
  function d1() {
    console.log("[enter] function d1");
    console.log("[enter] function d");
    return 4;
    console.log("[exit ] function d1");
  }
}

function e() {
  return 5;
}