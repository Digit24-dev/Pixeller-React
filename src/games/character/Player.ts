import { flush } from "@sentry/react";
import Phaser from "phaser";

interface iChara {
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  obj: globalThis.Phaser.Scene;
  width: number;
  height: number;
  speed: number;
  direction: string;
  oldPosition: { x: number; y: number };

  Preload(
    key: string,
    url?: string,
    xhrSettings?: Phaser.Types.Loader.XHRSettingsObject
  ): void;

  Create(
    x: number,
    y: number,
    preset: string
  ): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  Move(
    cursor: Phaser.Types.Input.Keyboard.CursorKeys,
    move_soundEffect:
      | Phaser.Sound.NoAudioSound
      | Phaser.Sound.HTML5AudioSound
      | Phaser.Sound.WebAudioSound
  ): void;
  Effect(): void;
}

class Player implements iChara {
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  obj: globalThis.Phaser.Scene;
  width: number;
  height: number;
  speed: number;
  direction: string;
  oldPosition: { x: number; y: number };
  client_id: string;
  /**
   * constructor of class Player
   * @param obj Game Object of Phaser
   * @param width of player Image width
   * @param height of player Image height
   */
  constructor(obj: globalThis.Phaser.Scene, width: number, height: number) {
    this.obj = obj;
    this.width = width;
    this.height = height;
    this.direction = "down";
    this.speed = 200;
  }

  /**
   * Preload
   * @param key object name to register on Phaser Game Object
   * @param url img source(url or file path)
   * @param xhrSettings meta data of img(frames...) or null
   */
  Preload(
    key: string,
    url?: string,
    xhrSettings?: Phaser.Types.Loader.XHRSettingsObject
  ) {
    this.obj.load.atlas(key, url, xhrSettings);
  }

  /**
   * Creating Imgs, Anims, Colliders. it returns Object of player.
   * @param x x position of player
   * @param y y positioin of player
   * @param preset shape of player
   * @returns object of player
   */
  Create(
    x: number,
    y: number,
    preset: string
  ): Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {
    const playerWorkDConfig = {
      key: "walk_down",
      frames: this.obj.anims.generateFrameNames(preset, {
        start: 0,
        end: 3,
        prefix: "frame_0_",
      }),
      frameRate: 10,
      repeat: -1,
    };
    const playerWorkLConfig = {
      key: "walk_left",
      frames: this.obj.anims.generateFrameNames(preset, {
        start: 0,
        end: 3,
        prefix: "frame_1_",
      }),
      frameRate: 10,
      repeat: -1,
    };
    const playerWorkRConfig = {
      key: "walk_right",
      frames: this.obj.anims.generateFrameNames(preset, {
        start: 0,
        end: 3,
        prefix: "frame_2_",
      }),
      frameRate: 10,
      repeat: -1,
    };
    const playerWorkUConfig = {
      key: "walk_up",
      frames: this.obj.anims.generateFrameNames(preset, {
        start: 0,
        end: 3,
        prefix: "frame_3_",
      }),
      frameRate: 10,
      repeat: -1,
    };

    this.obj.anims.create(playerWorkDConfig);
    this.obj.anims.create(playerWorkLConfig);
    this.obj.anims.create(playerWorkRConfig);
    this.obj.anims.create(playerWorkUConfig);

    this.player = this.obj.physics.add.sprite(x, y, preset).setScale(0.8, 0.8);

    this.player.body.setSize(this.width, this.height, true);
    this.player.setCollideWorldBounds(true);
    this.oldPosition = { x: x, y: y };

    return this.player;
  }

  /**
   * Player's Move method along Keyboard Events.
   * @param cursor Keyboard Events
   */
  Move(
    cursor: Phaser.Types.Input.Keyboard.CursorKeys,
    move_soundEffect:
      | Phaser.Sound.NoAudioSound
      | Phaser.Sound.HTML5AudioSound
      | Phaser.Sound.WebAudioSound
  ) {
    // const { left, right, up, down } = cursor;
    const up: Phaser.Input.Keyboard.Key = cursor.up;
    const down: Phaser.Input.Keyboard.Key = cursor.down;
    const left: Phaser.Input.Keyboard.Key = cursor.left;
    const right: Phaser.Input.Keyboard.Key = cursor.right;

    let velocityX = 0;
    let velocityY = 0;
    let animationKey: string | null = null;

    if (left.isDown) {
      velocityX = -this.speed;
      animationKey = "walk_left";
    } else if (right.isDown) {
      velocityX = this.speed;
      animationKey = "walk_right";
    }

    // if (up.isDown) {
    if (up.isDown) {
      velocityY = -this.speed;
      animationKey = "walk_up";
    } else if (down.isDown) {
      velocityY = this.speed;
      animationKey = "walk_down";
    }

    // 대각선 이동 시 속도 정규화
    if (velocityX !== 0 && velocityY !== 0) {
      const factor = 1 / Math.sqrt(2);
      velocityX *= factor;
      velocityY *= factor;
    }

    this.player.setVelocity(velocityX, velocityY);

    if (animationKey) {
      this.player.play(animationKey, true);
      this.direction = animationKey;
    } else {
      move_soundEffect.stop();
      this.player.setVelocity(0, 0);
      this.player.anims.stop();
    }

    // 위치를 정수로 반올림
    // this.player.x = Math.round(this.player.x);
    // this.player.y = Math.round(this.player.y);

    if (
      this.oldPosition.x !== this.player.x ||
      this.oldPosition.y !== this.player.y
    ) {
      if (up || down || left || right) {
        if (!move_soundEffect.isPlaying)
          move_soundEffect.play({
            volume: 0.5,
            loop: true,
          });
      }
    }
  }

  Move_(
    keyboard: Phaser.Input.Keyboard.KeyboardPlugin,
    move_soundEffect:
      | Phaser.Sound.NoAudioSound
      | Phaser.Sound.HTML5AudioSound
      | Phaser.Sound.WebAudioSound
  ) {
    // const { left, right, up, down } = cursor;
    const up: Phaser.Input.Keyboard.Key = keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.W, false
    );
    const down: Phaser.Input.Keyboard.Key = keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.S, false
    );
    const left: Phaser.Input.Keyboard.Key = keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.A, false
    );
    const right: Phaser.Input.Keyboard.Key = keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.D, false
    );

    let velocityX = 0;
    let velocityY = 0;
    let animationKey: string | null = null;

    if (left.isDown) {
      velocityX = -this.speed;
      animationKey = "walk_left";
    } else if (right.isDown) {
      velocityX = this.speed;
      animationKey = "walk_right";
    }

    // if (up.isDown) {
    if (up.isDown) {
      velocityY = -this.speed;
      animationKey = "walk_up";
    } else if (down.isDown) {
      velocityY = this.speed;
      animationKey = "walk_down";
    }

    // 대각선 이동 시 속도 정규화
    if (velocityX !== 0 && velocityY !== 0) {
      const factor = 1 / Math.sqrt(2);
      velocityX *= factor;
      velocityY *= factor;
    }

    this.player.setVelocity(velocityX, velocityY);

    if (animationKey) {
      this.player.play(animationKey, true);
      this.direction = animationKey;
    } else {
      move_soundEffect.stop();
      this.player.setVelocity(0, 0);
      this.player.anims.stop();
    }

    // 위치를 정수로 반올림
    // this.player.x = Math.round(this.player.x);
    // this.player.y = Math.round(this.player.y);

    if (
      this.oldPosition.x !== this.player.x ||
      this.oldPosition.y !== this.player.y
    ) {
      if (up || down || left || right) {
        if (!move_soundEffect.isPlaying)
          move_soundEffect.play({
            volume: 0.5,
            loop: true,
          });
      }
    }
  }

  /**
   * Move the player to a specific coordinate.
   * @param x The x-coordinate to move to.
   * @param y The y-coordinate to move to.
   */
  async moveTo(x: number, y: number) {
    // Calculate the distance to the target
    console.log(x, y);
    const dx = x - this.player.x;
    const dy = y - this.player.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Calculate the duration for the tween based on the distance to the target
    const duration = (distance / this.speed) * 1000; // speed is in pixels per second, so multiply by 1000 to get duration in milliseconds

    // Create a tween that updates the player's position
    this.obj.tweens.add({
      targets: this.player,
      x: x,
      y: y,
      duration: duration,
      ease: "Linear",
    });
  }

  // 플레이어의 위치를 블록 단위로 움직이게 하는 메서드
  moveToBlock(x: number, y: number) {
    // 블록 크기 정의
    const BLOCK_SIZE = 32;
    // 블록 단위로 반올림
    const targetX = Math.round(x / BLOCK_SIZE) * BLOCK_SIZE;
    const targetY = Math.round(y / BLOCK_SIZE) * BLOCK_SIZE;

    // 플레이어의 위치를 블록 단위로 업데이트
    this.player.x = targetX;
    this.player.y = targetY;
  }

  Effect() {}
}

export default Player;
