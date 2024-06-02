import React from 'react'
import { PDFDownloadLink, Document, Page, Text, View } from '@react-pdf/renderer'


export const ReactPdfTicket = ({bookingData}) => {
  return (
    <Document>
      <Page>
        <View style={{ padding: 10 }}>
          <Text style={{ textAlign: 'center' }}>Ticket</Text>
          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <Text>Phone: {bookingData.parkingLotId.mobile}</Text>
          </View>
          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <Text>Services:</Text>
            {/* Render services here */}
          </View>
          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <Text>Booked Slots:</Text>
            {/* Render booked slots here */}
          </View>
          <View style={{ marginTop: 10, marginBottom: 10 }}>
            <Text>Total: Rs {bookingData.amount}</Text>
            <Text style={{ textAlign: 'center' }}>For any further details you can contact the number above</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}

