#include "sensors/sensor_manager.h"
#include "string.h"

volatile bool sx1280_lora_ranging = false; // yeah sadly wasnt able to move it into the class
void sx1280_ranging_end(void)
{
    sx1280_lora_ranging = false;
}

float get_altitude(float pressure_hPa, float sea_level_hPa)
{
    float altitude;
    altitude = 44330 * (1.0 - pow(pressure_hPa / sea_level_hPa, 0.1903));
    return altitude;
}
String Sensor_manager::init(Config &config)
{

    String status;

    // WIRE1
    Wire1.setSCL(config.WIRE1_SCL);
    Wire1.setSDA(config.WIRE1_SDA);
    // GPS UART0
    _gps_serial = &Serial1;
    _gps_serial->setFIFOSize(256); // once had a prblem of not reading serial properly but this seemed to fix it
    _gps_serial->begin(config.GPS_BAUDRATE);
    _gps_initialized = true;

    // BARO WIRE1
    _baro = MS5611(config.MS5611_ADDRESS);
    if (!_baro.begin(&Wire1))
    {
        status += " Baro error";
    }
    else
    {
        _baro_initialized = true;
    }
    // HUMIDITY WIRE1
    if (!_humidity.begin(&Wire1))
    {
        status += " Humidity error";
    }
    else
    {
        _humidity_initialized = true;
    }

    // IMU WIRE1
    _imu = Adafruit_BNO055(55, config.BNO055_ADDRESS, &Wire1);
    if (!_imu.begin())
    {
        status += " IMU error";
    }
    else
    {
        _imu_initialized = true;
    }
    // mybe need to set axis max range TODO
    // RANGING lora
    Config::Lora_device lora_cfg = config.LORA2400;
    lora_cfg.SPI->setRX(lora_cfg.RX);
    lora_cfg.SPI->setTX(lora_cfg.TX);
    lora_cfg.SPI->setSCK(lora_cfg.SCK);
    lora_cfg.SPI->begin();
    int state = _lora.begin();
    if (state != RADIOLIB_ERR_NONE)
    {
        status += " SX1280 error (" + String(state) + ")";
    }
    else
    {
        // setting paramaters
        _lora.setOutputPower(lora_cfg.TXPOWER);
        _lora.setSpreadingFactor(lora_cfg.SPREADING);
        _lora.setCodingRate(lora_cfg.CODING_RATE);
        _lora.setBandwidth(lora_cfg.SIGNAL_BW);
        _lora.setSyncWord(lora_cfg.SYNC_WORD);
        _lora.setFrequency(lora_cfg.FREQUENCY);
        _lora_initialized = true;
    }

    return status;
}

// After testing it turned out to change the ranging address we needed to reaset the lora before every request

void Sensor_manager::enable_ranging(Config &config)
{
    data.ranging_result = -1;
    data.ranging_address = 0;
    // if (_lora_wait_for_othersat)
    // {
    //     // check timer
    //     if (millis() >= _wait_for_othersat_start_time + config.WAITING_FOR_OTHERSAT_TIMEOUT)
    //     {
    //         _lora_wait_for_othersat = false;
    //         Serial.println("Switching back");
    //     }
    //     // check incoming msg
    //     String incoming_msg;
    //     _lora.receive(incoming_msg);
    //     if (incoming_msg == config.RANGE_DONE)
    //     {
    //         _lora_wait_for_othersat = false;
    //         Serial.println("Switching back msg");
    //     }
    //     else if (incoming_msg != "")
    //     {
    //         Serial.println("ranging recieved noise: " + incoming_msg);
    //     }
    //     return;
    // }
    if (sx1280_lora_ranging)
    {
        if (millis() >= _ranging_start_time + config.RANGING_TIMEOUT)
        {
            sx1280_lora_ranging = false;
            _lora_range_state = RADIOLIB_ERR_RANGING_TIMEOUT;
            _lora.clearDio1Action();
            _lora.finishTransmit();
        }
    }
    if (!sx1280_lora_ranging)
    {

        data.ranging_address = config.RANGING_SLAVE_ADDRESS[_lora_slave_address_index];
        // if available read result
        if (_lora_range_state == RADIOLIB_ERR_NONE)
        {
            data.ranging_result = _lora.getRangingResult();
            String address = String(config.RANGING_SLAVE_ADDRESS[_lora_slave_address_index], HEX);
            Serial.print(address);
            Serial.println(" Range good: " + String(data.ranging_result));
        }
        else
        {
            data.ranging_result = -1;
            Serial.println("Range bad" + String(_lora_range_state));
        }
        _lora_range_state = -1;

        _lora.clearDio1Action();
        _lora.finishTransmit();

        // increment next address
        int array_length = sizeof(config.RANGING_SLAVE_ADDRESS) / sizeof(long);
        if (_lora_slave_address_index >= array_length - 1)
        {
            _lora_slave_address_index = 0;
            // send command to nanosat
            // _lora.transmit(config.RANGE_DONE);
            // Serial.println("Switching");

            _wait_for_othersat_start_time = millis();
            _lora_wait_for_othersat = true;
            // start timer
        }
        else
        {
            _lora_slave_address_index++;
        }
        //
        // start ranging
        _lora.reset();
        int state = _lora.begin();
        if (state != RADIOLIB_ERR_NONE)
        {
        }
        else
        {
            // setting paramaters
            _lora.setOutputPower(config.LORA2400.TXPOWER);
            _lora.setSpreadingFactor(config.LORA2400.SPREADING);
            _lora.setCodingRate(config.LORA2400.CODING_RATE);
            _lora.setBandwidth(config.LORA2400.SIGNAL_BW);
            _lora.setSyncWord(config.LORA2400.SYNC_WORD);
            _lora.setFrequency(config.LORA2400.FREQUENCY);
            _lora_initialized = true;
        }
        // didn't work
        // if (_lora_slave_address_index == 0)
        // {
        //     _lora.setFrequency(config.LORA2400.FREQUENCY);
        // }
        // else if (_lora_slave_address_index == 1)
        // {
        //     _lora.setFrequency(config.LORA2400.FREQUENCY + 2.0);
        // }
        // else if (_lora_slave_address_index == 2)
        // {
        //     _lora.setFrequency(config.LORA2400.FREQUENCY + 4.0);
        // }
        // else if (_lora_slave_address_index == 3)
        // {
        //     _lora.setFrequency(config.LORA2400.FREQUENCY + 6.0);
        // }
        _lora.setDio1Action(sx1280_ranging_end);
        sx1280_lora_ranging = true;
        _lora_range_state = _lora.startRanging(true, config.RANGING_SLAVE_ADDRESS[_lora_slave_address_index]);

        if (_lora_range_state != RADIOLIB_ERR_NONE)
        {
            Serial.println("Ranging error");
        }
        _ranging_start_time = millis();
    }
}
void Sensor_manager::read_gps()
{
    if (!_gps_initialized)
    {
        return;
    }
    while (_gps_serial->available() > 0)
    {
        _gps.encode(_gps_serial->read());
        if (_gps.location.isUpdated())
        {
            _last_gps_packet_time = millis();
            data.gps_lat = _gps.location.lat();
            data.gps_lng = _gps.location.lng();
            data.gps_height = _gps.altitude.meters();
            data.gps_sattelites = _gps.satellites.value();
        }
    }
}
void Sensor_manager::read_baro(Config &config)
{
    if (_baro_initialized != true)
    {
        Serial.println("Baro not init.. returning");
        return;
    }
    _baro.read(); // note no error checking => "optimistic".
    data.pressure = _baro.getPressure();
    data.baro_height = get_altitude(data.pressure, config.SEA_LEVEL_HPA);
    data.temperature = _baro.getTemperature();
}
void Sensor_manager::read_humidity()
{
    if (!_humidity_initialized)
    {
        Serial.println("Humidity not init.. returning");
        return;
    }
    sensors_event_t humidity, temp;
    _humidity.getEvent(&humidity, &temp); // populate temp and humidity objects with fresh data
    data.humidity = humidity.relative_humidity;
}

void Sensor_manager::read_time()
{
    data.time = millis();
    data.time_since_last_gps = data.time - _last_gps_packet_time;
}
void Sensor_manager::read_imu()
{
    if (!_imu_initialized)
    {
        Serial.println("IMU not init.. returning");
        return;
    }

    sensors_event_t gyroData, accData;
    _imu.getEvent(&gyroData, Adafruit_BNO055::VECTOR_GYROSCOPE);
    _imu.getEvent(&accData, Adafruit_BNO055::VECTOR_ACCELEROMETER);
    data.acc[0] = accData.acceleration.x;
    data.acc[1] = accData.acceleration.y;
    data.acc[2] = accData.acceleration.z;

    data.gyro[0] = accData.gyro.x;
    data.gyro[1] = accData.gyro.x;
    data.gyro[2] = accData.gyro.x;
}
void Sensor_manager::read_data(Config &config)
{

    read_gps();
    read_baro(config);
    read_humidity();
    read_imu();
    enable_ranging(config);
    read_time();
}
