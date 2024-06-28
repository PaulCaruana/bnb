'use client'

import { useEffect, useState } from 'react'
import {
  Typography,
  Button,
  Row,
  Col,
  Calendar,
  Form,
  Input,
  List,
  Rate,
} from 'antd'
import {
  MailOutlined,
  CalendarOutlined,
  BookOutlined,
  StarOutlined,
} from '@ant-design/icons'
const { Title, Text, Paragraph } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function AccommodationDetailsPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()

  const [accommodation, setAccommodation] =
    useState<Model.Accommodation | null>(null)
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')
  const [bookingDates, setBookingDates] = useState<{
    startDate: string
    endDate: string
  }>({ startDate: '', endDate: '' })

  useEffect(() => {
    const fetchAccommodation = async () => {
      try {
        const accommodationData = await Api.Accommodation.findOne(
          params.accommodationId,
          { includes: ['host', 'availabilitys', 'reviews'] },
        )
        setAccommodation(accommodationData)
      } catch (error) {
        enqueueSnackbar('Failed to load accommodation details', {
          variant: 'error',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAccommodation()
  }, [params.accommodationId])

  const handleContactHost = async () => {
    if (!message) {
      enqueueSnackbar('Please enter a message', { variant: 'error' })
      return
    }

    try {
      await Api.Contact.createOneByAccommodationId(params.accommodationId, {
        message,
        userId,
      })
      enqueueSnackbar('Message sent to the host', { variant: 'success' })
      setMessage('')
    } catch (error) {
      enqueueSnackbar('Failed to send message', { variant: 'error' })
    }
  }

  const handleBooking = async () => {
    if (!bookingDates.startDate || !bookingDates.endDate) {
      enqueueSnackbar('Please select booking dates', { variant: 'error' })
      return
    }

    try {
      const booking = await Api.Booking.createOneByUserId(userId, {
        startDate: bookingDates.startDate,
        endDate: bookingDates.endDate,
        status: 'pending',
        paymentStatus: 'unpaid',
        accommodationId: params.accommodationId,
      })
      router.push(`/bookings/${booking.id}`)
    } catch (error) {
      enqueueSnackbar('Failed to create booking', { variant: 'error' })
    }
  }

  const handleDateSelect = date => {
    if (!bookingDates.startDate) {
      setBookingDates({ startDate: date.format('YYYY-MM-DD'), endDate: '' })
    } else {
      setBookingDates({ ...bookingDates, endDate: date.format('YYYY-MM-DD') })
    }
  }

  if (loading) {
    return <PageLayout layout="narrow">Loading...</PageLayout>
  }

  return (
    <PageLayout layout="narrow">
      <Title level={2}>{accommodation?.title}</Title>
      <Paragraph>{accommodation?.description}</Paragraph>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <Title level={4}>
            <CalendarOutlined /> Availability Calendar
          </Title>
          <Calendar fullscreen={false} onSelect={handleDateSelect} />
        </Col>
        <Col span={24}>
          <Title level={4}>
            <MailOutlined /> Contact Host
          </Title>
          <Form layout="vertical">
            <Form.Item label="Message">
              <Input.TextArea
                rows={4}
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
            </Form.Item>
            <Button type="primary" onClick={handleContactHost}>
              Send Message
            </Button>
          </Form>
        </Col>
        <Col span={24}>
          <Title level={4}>
            <StarOutlined /> Reviews
          </Title>
          <List
            itemLayout="horizontal"
            dataSource={accommodation?.reviews}
            renderItem={review => (
              <List.Item>
                <List.Item.Meta
                  title={<Rate disabled defaultValue={review.rating} />}
                  description={review.comment}
                />
              </List.Item>
            )}
          />
        </Col>
        <Col span={24}>
          <Button
            type="primary"
            icon={<BookOutlined />}
            onClick={handleBooking}
          >
            Book
          </Button>
        </Col>
      </Row>
    </PageLayout>
  )
}
