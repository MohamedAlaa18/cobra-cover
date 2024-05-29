import { ShippingAddress } from "@prisma/client"
import { Body, Column, Container, Head, Heading, Hr, Html, Img, Preview, Row, Section, Text } from "@react-email/components"
import { adressTitle as addressTitle, body, container, footer, global, message, paddingY, track } from "./style"


function OrderReceivedEmail({ shippingAddress, orderId, orderDate }: { shippingAddress: ShippingAddress, orderId: string, orderDate: string }) {
    const baseUrl =
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : 'https://cobracover.vercel.app'

    return (
        <Html>
            <Head />
            <Preview>Your order summary and estimated delivery date</Preview>

            <Body style={body}>
                <Container style={container}>
                    <Section style={message}>
                        <Img src={`${baseUrl}/snake-3.png`} width='65' height='73' alt='delivery snake' style={{ margin: 'auto' }} />

                        <Heading style={global.heading}>Thank you for your order!</Heading>

                        <Text style={{ ...global.text, fontSize: 14 }}>
                            {shippingAddress.street}, {shippingAddress.city},{' '}
                            {shippingAddress.state} {shippingAddress.postalCode}
                        </Text>

                        <Text style={{ ...global.text, marginTop: 24 }}>
                            If you have any questions regarding your order, please feel free
                            to contact us with your order number and we&apos;re here to help.
                        </Text>

                    </Section>

                    <Hr style={global.hr} />

                    <Section style={global.defaultPadding}>
                        <Text style={addressTitle}>Shipping to: {shippingAddress.name}</Text>
                        <Text style={{ ...global.text, fontSize: 14 }}>
                            {shippingAddress.street}, {shippingAddress.city},{' '}
                            {shippingAddress.state} {shippingAddress.postalCode}
                        </Text>
                    </Section>

                    <Hr style={global.hr} />

                    <Section style={global.defaultPadding}>
                        <Row style={{ display: 'inline-flex gap-16', marginBottom: 40 }}>
                            <Column style={{ width: 170 }}>
                                <Text style={global.paragraphWithBold}>Order Number</Text>
                                <Text style={track.number}>{orderId}</Text>
                            </Column>
                            <Column style={{ marginLeft: 20 }}>
                                <Text style={global.paragraphWithBold}>Order Date</Text>
                                <Text style={track.number}>{orderDate}</Text>
                            </Column>
                        </Row>
                    </Section>

                    <Hr style={global.hr} />

                    <Section style={paddingY}>
                        <Row>
                            <Text style={{ ...footer.text, paddingTop: 30, paddingBottom: 30 }}>
                                Please contact us if you have any questions. (If you reply to
                                this email, we won&apos;t be able to see it.)
                            </Text>
                        </Row>
                        <Row>
                            <Text style={footer.text}>
                                &copy; cobraCover, Inc. All Rights Reserved.
                            </Text>
                        </Row>
                    </Section>
                </Container>
            </Body>
        </Html >
    )
}

export default OrderReceivedEmail