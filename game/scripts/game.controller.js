class Cena extends Phaser.Scene
{
    //281020235271083

    player = null;
    layer;
    cursors = null;
    map;
    bounceAnima = true;
    keySpace;

    constructor()
    {
        super();
    }

    preload() {
        this.load.image('sky', 'assets/scenario/sky.png');
        this.load.image('dirtA', 'assets/scenario/dirtA.png');
        this.load.image('grassA', 'assets/scenario/grassA.png');
        this.load.tilemapTiledJSON('map', 'assets/maps/mapa.json');

        this.load.spritesheet('girl', 
            'assets/girl/girl-sprite.png',
            { frameWidth: 60, frameHeight: 60 }
        );
    }

    create() {

        const width = this.scale.width;
        const height = this.scale.height;


        var sky = this.add.image(width * 0.5, height * 0.5, 'sky');
        sky.scaleX = 6;
        sky.scaleY = 3;
        sky.setScrollFactor(0);
        
        this.map = this.make.tilemap({ key: 'map', tileWidth: 40, tileHeight: 40 });
        

        var dirtTiles = this.map.addTilesetImage('dirtA', 'dirtA', 40, 40);
        var grassTiles = this.map.addTilesetImage('grassA', 'grassA', 40, 40);
        this.layer = this.map.createLayer('platform', [ dirtTiles, grassTiles ]);
        

        this.player = this.physics.add.sprite(200, 350, 'girl').setScale(2.5).setSize(25,50);
        this.player.setBounce(0);
        this.player.setCollideWorldBounds(true);

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('girl', { start: 0, end: 3 }),
            frameRate: 3,
            repeat: -1
        });

        this.anims.create({
            key: 'hit',
            frames: this.anims.generateFrameNumbers('girl', { start: 5, end: 16 }),
            frameRate: 20
        });

        this.player.anims.play('idle');
        this.player.on(Phaser.Animations.Events.ANIMATION_COMPLETE_KEY + 'hit', () => {
            this.bounceAnima = true;
        });
    
        this.layer.setCollision([1, 2]);
        this.physics.add.collider(this.player, this.layer);


        this.cursors = this.input.keyboard.createCursorKeys();
    
        this.cameras.main.setBounds(0, 0, 2560, 720);
        this.physics.world.setBounds(0,0, 2560, 720);
        this.cameras.main.startFollow(this.player);

        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    }

    update(time, elta) {

                  
          if (this.cursors.left.isDown)
          {
              this.player.setVelocityX(-300);
              this.player.flipX = true;
          }
          else if (this.cursors.right.isDown)
          {
              this.player.setVelocityX(300);
              this.player.flipX = false;
          }
          else
          {
              this.player.setVelocityX(0);   
              //this.player.anims.play('idle');
          }
      
          if (this.cursors.up.isDown && this.player.body.blocked.down)
          {
              this.player.setVelocityY(-600);
          }

          if (this.keySpace.isDown && this.player.body.blocked.down)
          {
              if (this.bounceAnima) {
                this.player.anims.play('hit');
                this.bounceAnima = false;
              }
          }
    }
}


var config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 780 },
            debug: false
        }
    },
    scene: Cena
};

var game = new Phaser.Game(config);
