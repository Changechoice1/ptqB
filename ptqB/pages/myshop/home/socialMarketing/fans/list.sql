SELECT t.user_id,
           UNIX_TIMESTAMP(MAX(t.add_time)) AS add_time,
					 UNIX_TIMESTAMP(t.add_time) AS add_order_time,
           cnt,
           amount,
           dxf,
           order_id,
           hx_tel,
	       telephone,
           (SELECT COUNT(1)
            FROM   app_activity_initiator aci
            LEFT JOIN app_activity_part acp
            ON aci.id = acp.initiator_id
            WHERE  aci.initiator_user_id != acp.part_user_id
                   AND acp.part_user_id = t.user_id) AS user_count,
           (SELECT COUNT(1)
            FROM   app_activity_voucher
            WHERE  user_id = t.user_id) AS voucher_count
    FROM   
(SELECT user_id,
                   FROM_UNIXTIME(MAX(add_time)) AS add_time,
                   COUNT(1) AS cnt,
                   SUM(CASE
                         WHEN pay_status = 1 THEN total_price
                         ELSE 08
                       END) amount,
                   SUM(CASE
                         WHEN STATUS = 3 THEN 1
                         ELSE 0
                       END) dxf,
                   id AS order_id,
                   hx_tel,
			       telephone
            FROM   app_order_list
            WHERE  store_id = 34135
            GROUP  BY user_id
            UNION
            SELECT DISTINCT part_user_id,
                            MAX(create_time),
                            0,
                            0,
                            0,
                            0,
                            NULL,
                            ''
            FROM   app_activity_part p
            WHERE  p.initiator_id IN (SELECT DISTINCT aci.id
                                      FROM   app_goods aog
                                      INNER JOIN app_activity_initiator aci
                                      ON aci.goods_id = aog.id
																			LEFT JOIN app_order_list aol ON aol.store_id = aog.store_id	
                                      WHERE  aog.store_id = 34135) 	 
            GROUP  BY part_user_id) t
            GROUP  BY t.user_id
						HAVING telephone != '' OR (hx_tel != '' AND hx_tel IS NOT NULL)
						ORDER  BY add_time DESC