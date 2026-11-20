# STM32duino 六路 I²C 编译核验

2026-11-21 更新。使用 Arduino CLI 1.6.0 与 STM32duino 3.1.0，以下同一份六路 `TwoWire` 草图通过四个板型的编译。将草图保存为 `SixBusProof/SixBusProof.ino`。

```bash
arduino-cli compile --fqbn 'STMicroelectronics:stm32:Nucleo_144:pnum=NUCLEO_U5A5ZJ_Q,usb=none' SixBusProof
arduino-cli compile --fqbn 'STMicroelectronics:stm32:GenU5:pnum=GENERIC_U595ZITXQ,usb=CDCgen,xusb=HSFS' SixBusProof
```

Nucleo 目标的 `Serial` 走板载 ST-LINK 虚拟串口；三个 Generic 编译目标选用 `CDCgen` 和 `HSFS`。

小封装复现：将 STM32duino 3.1.0 的 STM32 板包复制到测试用 Arduino 数据目录，在板包根目录的 `boards.local.txt` 追加以下板型。在两套 variant 目录中各放一份 LQFP144 variant（`U595Z(I-J)TxQ_U599Z(I-J)TxQ_U5A5ZJTxQ_U5A9ZJTxQ`）的 `ldscript.ld`；链接参数由当前板型提供。

```ini
# Generic U595QIIxQ
GenU5.menu.pnum.GENERIC_U595QIIXQ=Generic U595QIIxQ
GenU5.menu.pnum.GENERIC_U595QIIXQ.upload.maximum_size=2097152
GenU5.menu.pnum.GENERIC_U595QIIXQ.upload.maximum_data_size=2574336
GenU5.menu.pnum.GENERIC_U595QIIXQ.build.board=GENERIC_U595QIIXQ
GenU5.menu.pnum.GENERIC_U595QIIXQ.build.product_line=STM32U595xx
GenU5.menu.pnum.GENERIC_U595QIIXQ.build.variant=STM32U5xx/U595Q(I-J)IxQ_U5A5Q(I-J)IxQ
GenU5.menu.pnum.GENERIC_U595QIIXQ.debug.svd_file={runtime.tools.STM32_SVD.path}/svd/STM32U5xx/STM32U595.svd

# Generic U595ZIYxQ
GenU5.menu.pnum.GENERIC_U595ZIYXQ=Generic U595ZIYxQ
GenU5.menu.pnum.GENERIC_U595ZIYXQ.upload.maximum_size=2097152
GenU5.menu.pnum.GENERIC_U595ZIYXQ.upload.maximum_data_size=2574336
GenU5.menu.pnum.GENERIC_U595ZIYXQ.build.board=GENERIC_U595ZIYXQ
GenU5.menu.pnum.GENERIC_U595ZIYXQ.build.product_line=STM32U595xx
GenU5.menu.pnum.GENERIC_U595ZIYXQ.build.variant=STM32U5xx/U595Z(I-J)YxQ_U5A5ZJYxQ
GenU5.menu.pnum.GENERIC_U595ZIYXQ.debug.svd_file={runtime.tools.STM32_SVD.path}/svd/STM32U5xx/STM32U595.svd
```

```bash
arduino-cli compile --fqbn 'STMicroelectronics:stm32:GenU5:pnum=GENERIC_U595QIIXQ,usb=CDCgen,xusb=HSFS,upload_method=dfuMethod' SixBusProof
arduino-cli compile --fqbn 'STMicroelectronics:stm32:GenU5:pnum=GENERIC_U595ZIYXQ,usb=CDCgen,xusb=HSFS,upload_method=dfuMethod' SixBusProof
```

掌板时钟用 CubeMX 或 ST 的 U5A5 USB 例程作配置基线，按自制板设置 HSE、USBPHY 时钟及片上 PHY。详见[主报告的 USB‑C / CDC 方案](./#usb-cdc)。

```cpp
#include <Arduino.h>
#include <Wire.h>

// 构造函数参数为 SDA、SCL；ALT1 选取 I²C4 和 I²C6 所用的复用功能。
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

编译器输出（Nucleo、U595 LQFP144、U595 UFBGA132、U595 WLCSP150）：

```text
Sketch uses 40651 bytes (0%) of program storage space. Maximum is 4194304 bytes.
Global variables use 3164 bytes (0%) of dynamic memory, leaving 2552740 bytes for local variables. Maximum is 2555904 bytes.
Sketch uses 45568 bytes (2%) of program storage space. Maximum is 2097152 bytes.
Global variables use 8628 bytes (0%) of dynamic memory, leaving 2547276 bytes for local variables. Maximum is 2555904 bytes.
Sketch uses 39916 bytes (1%) of program storage space. Maximum is 2097152 bytes.
Global variables use 8628 bytes (0%) of dynamic memory, leaving 2565708 bytes for local variables. Maximum is 2574336 bytes.
Sketch uses 40060 bytes (1%) of program storage space. Maximum is 2097152 bytes.
Global variables use 8628 bytes (0%) of dynamic memory, leaving 2565708 bytes for local variables. Maximum is 2574336 bytes.
```
