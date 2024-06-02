import React from 'react'
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: {
    padding: 10,
    width: '50%',
  },
  ticket: {
    border: '2px dashed #000',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#fff',
    margin: 10,
  },
  header: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    borderBottom: '1px solid #000',
    paddingBottom: 5,
  },
  section: {
    marginVertical: 5,
    paddingHorizontal: 5,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  total: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
  },
  footer: {
    textAlign: 'center',
    marginTop: 10,
    fontSize: 12,
    color: '#555',
  },
});

export const ReactPdfTicket = ({ bookingData }) => {
  console.log(bookingData);

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.ticket}>
          <Text style={styles.header}>Parking Ticket</Text>

          <View style={styles.section}>
            <Text style={styles.label}>Services chosen:</Text>
            {bookingData.servicesUsed.airPressure ? <Text>Air pressure checking : {bookingData.parkingLotId?.airPressureCheckPrice}</Text> : null}
            {bookingData.servicesUsed.waterService ? <Text>Water service : {bookingData.parkingLotId?.waterServicePrice}</Text> : null}
            {bookingData.servicesUsed.evCharging ? <Text>Air pressure checking : {bookingData.parkingLotId?.evChargeFacilityPrice}</Text> : null}
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Booked Time Slots:</Text>
            {bookingData.selectedSlots.map((slot, index) => (
              <Text key={index}>{slot}</Text>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>Slot Pricing:</Text>
            <Text>{bookingData.parkingLotId.pricePerHour} x {bookingData.selectedSlots.length}</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.total}>Total Amount Paid: Rs {bookingData.amount} Paid</Text>
            <Text style={styles.footer}>
              For any further details you can contact the number {bookingData.parkingLotId.mobile}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}

