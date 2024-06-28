'use client'

import { useState } from 'react'
import { Typography, Form, Input, Button, Rate, Row, Col } from 'antd'
import { CheckCircleOutlined } from '@ant-design/icons'
const { Title, Text } = Typography
import { useAuthentication } from '@web/modules/authentication'
import dayjs from 'dayjs'
import { useSnackbar } from 'notistack'
import { useRouter, useParams } from 'next/navigation'
import { Api, Model } from '@web/domain'
import { PageLayout } from '@web/layouts/Page.layout'

export default function ReviewPage() {
  const router = useRouter()
  const params = useParams<any>()
  const authentication = useAuthentication()
  const userId = authentication.user?.id
  const { enqueueSnackbar } = useSnackbar()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values: { rating: number; comment: string }) => {
    if (!userId) {
      enqueueSnackbar('You must be logged in to leave a review', {
        variant: 'error',
      })
      return
    }

    const { rating, comment } = values
    const accommodationId = params.accommodationId

    try {
      setLoading(true)
      await Api.Review.createOneByUserId(userId, {
        rating,
        comment,
        accommodationId,
      })
      enqueueSnackbar('Review submitted successfully', { variant: 'success' })
      router.push(`/accommodations/${accommodationId}`)
    } catch (error) {
      enqueueSnackbar('Failed to submit review', { variant: 'error' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageLayout layout="narrow">
      <Row justify="center" align="middle" style={{ minHeight: '100vh' }}>
        <Col xs={24} sm={20} md={16} lg={12} xl={8}>
          <Title level={2}>Leave a Review</Title>
          <Text>
            Share your experience with others by leaving a review for your stay.
          </Text>
          <Form layout="vertical" onFinish={onFinish} style={{ marginTop: 20 }}>
            <Form.Item
              name="rating"
              label="Rating"
              rules={[{ required: true, message: 'Please provide a rating' }]}
            >
              <Rate />
            </Form.Item>
            <Form.Item
              name="comment"
              label="Comment"
              rules={[{ required: true, message: 'Please provide a comment' }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                icon={<CheckCircleOutlined />}
              >
                Submit Review
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </PageLayout>
  )
}
