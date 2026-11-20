# STM32duino 六路 I²C 编译核验

2026-11-20，Arduino CLI 1.6.0，STM32duino 3.1.0。安装板包后，用以下命令编译目录 `SixBusProof/` 中同名草图。构建通过；未烧录，不作为引脚电气、FPC、总线刷新率或 USB 枚举的实测证据。

```bash
arduino-cli compile --fqbn 'STMicroelectronics:stm32:Nucleo_144:pnum=NUCLEO_U5A5ZJ_Q,usb=none' SixBusProof
arduino-cli compile --fqbn 'STMicroelectronics:stm32:GenU5:pnum=GENERIC_U595ZITXQ,usb=CDCgen,xusb=HSFS' SixBusProof
```

`USB CDC` 目标需选 HS 或 HSFS。这里仅编译 HSFS。Nucleo 目标的 `Serial` 走板载 ST-LINK 虚拟串口。

```cpp
#include <Arduino.h>
#include <Wire.h>

// 构造函数参数为 SDA、SCL；ALT1 指定复用，不能用普通 GPIO 别名替代。
TwoWire bus1(PB7, PB6);
TwoWire bus2(PB14, PB13);
TwoWire bus3(PC1, PC0);
TwoWire bus4(PB11_ALT1, PB10_ALT1);
TwoWire bus5(PD0, PD1);
TwoWire bus6(PF0 | ALT1, PF1 | ALT1);
TwoWire* const buses[] = {&bus1, &bus2, &bus3, &bus4, &bus5, &bus6};
I2C_TypeDef* const expected[] = {I2C1, I2C2, I2C3, I2C4, I2C5, I2C6};

// Arduino 负责组织，HAL 句柄用来核对是否确实绑定到各自的外设。
void setup() {
  Serial.begin(460800);
  for (unsigned i = 0; i < 6; ++i) {
    buses[i]->begin();
    buses[i]->setClock(400000);
    buses[i]->beginTransmission(0x40);
    buses[i]->write(0xFE);
    if (buses[i]->endTransmission(false) == 0) {
      buses[i]->requestFrom(uint8_t(0x40), size_t(2));
      while (buses[i]->available()) buses[i]->read();
    }
    Serial.println(buses[i]->getHandle()->Instance == expected[i] ? i + 1 : 0);
  }
}

void loop() {
  delay(1000);
}
```

编译器输出（先 Nucleo，再 U595 Generic）：

```text
Sketch uses 40651 bytes (0%) of program storage space. Maximum is 4194304 bytes.
Global variables use 3164 bytes (0%) of dynamic memory, leaving 2552740 bytes for local variables. Maximum is 2555904 bytes.
Sketch uses 45568 bytes (2%) of program storage space. Maximum is 2097152 bytes.
Global variables use 8628 bytes (0%) of dynamic memory, leaving 2547276 bytes for local variables. Maximum is 2555904 bytes.
```
