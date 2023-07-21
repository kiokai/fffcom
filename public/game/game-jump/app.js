/*
- Name: Jumb Game
- Author: PanYang
- Date: 11/7/2023
*/

kaboom({
  scale: window.innerWidth / 393,
  font: "sans-serif",
  background: [255, 255, 255]
})

function draw(data){
  const isMain = data.scene == "main"
  
  const SPEED = isMain ? 400 : 0
  const JUMP = 650
  
  console.log(height(), height() / 3,height() - height() / 3)
  const plane = add([
    rect(width(), height() < 200 ? height() : height() / 3),
    pos(0, height() < 200 ? 0 : height() / 3),
    color(0, 0, 0)
  ])
  
  const land = add([
    rect(width(), 5),
    pos(0, plane.pos.y + plane.height),
    body({ isStatic: true }),
    area()
  ])
  
  add([
    text("FFFCOM.COM"),
    pos(width() / 5, plane.pos.y + 10),
    color(255, 255, 255)
  ])

  const player = add([
    circle(20),
    isMain ? pos(50, plane.pos.y + 50) : pos(data.player.pos.x, data.player.pos.y),
    color(0, 255, 0),
    isMain && body(),
    area(),
  ])
  
  if(isMain){
    let stt = 0
    loop(0.8, () => {
      stt ++
      
      add([
        rect(30, 70),
        pos(width(), plane.pos.y + plane.height),
        color(255, 0, 0),
        anchor("botleft"),
        move(LEFT, SPEED),
        area(),
        {
          stt: stt
        },
        "wall"
      ])
      
      add([
        text(stt, {
          size: 30
        }),
        pos(width() + 35, plane.pos.y + plane.height),
        anchor("botleft"),
        move(LEFT, SPEED),
        color(255, 255, 255)
      ])
    })
  } else {
    add([
      text("Bấm Để Tiếp Tục !!", {
        size: 30
      }),
      pos(width() / 6, plane.pos.y + 50),
      color(255, 255, 255)
    ])
    for(var i of data.wall){
      add([
        rect(30, 70),
        pos(i.pos.x, i.pos.y),
        color(255, 0, 0),
        anchor("botleft"),
      ])
      
      add([
        text(i.stt, {
          size: 30
        }),
        pos(i.pos.x + 35, i.pos.y),
        anchor("botleft"),
        color(255, 255, 255)
      ])
      
    }
  }
  
  function Jump(){
    if (player.isGrounded()) {
      player.jump(JUMP)
    }
  }
  
  onClick(() => {
    if(isMain) Jump()
    else go("main", {
      scene: "main"
    })
  })
  
  onKeyDown("space", () => {
    if(isMain) Jump()
    else go("main", {
      scene: "main"
    })
  })
  
  player.onCollide("wall", wall => {
    go("end", {
      scene: "end",
      player: player,
      wall: get("wall")
    })
  })
}

scene("main", data => {
  setGravity(2400)
  draw(data)
})
scene("end", data => draw(data))

go("main", {
  scene: "main"
})

screen.orientation.addEventListener("change", function(e) {
    window.location.reload()
});